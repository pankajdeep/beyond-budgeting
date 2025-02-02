import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { formatCurrency } from '@/lib/utils';

interface ChartData {
  name: string;
  value: number;
}

interface ThreeDChartProps {
  data: ChartData[];
}

export const ThreeDChart = ({ data }: ThreeDChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data?.length) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Calculate total value for proportions
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Create segments
    const radius = 2;
    const height = 0.5;
    const segments = 32;
    
    // Color palette with gradients
    const colors = [
      new THREE.Color('#FF6B6B'),
      new THREE.Color('#4ECDC4'),
      new THREE.Color('#45B7D1'),
      new THREE.Color('#96CEB4'),
      new THREE.Color('#FFEEAD'),
    ];

    // Create donut segments
    let startAngle = 0;
    const segments3D = data.map((item, index) => {
      const angle = (item.value / total) * Math.PI * 2;
      const geometry = new THREE.CylinderGeometry(
        radius,
        radius * 1.1,
        height,
        segments,
        1,
        true,
        startAngle,
        angle
      );

      // Create gradient material
      const color = colors[index % colors.length];
      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });

      const segment = new THREE.Mesh(geometry, material);
      segment.userData = { 
        name: item.name, 
        value: item.value,
        percentage: ((item.value / total) * 100).toFixed(1)
      };
      
      scene.add(segment);
      startAngle += angle;
      return segment;
    });

    // Position camera
    camera.position.set(0, 4, 6);
    camera.lookAt(0, 0, 0);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 4;

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handle mouse move for tooltips
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !tooltipRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(segments3D);

      if (intersects.length > 0) {
        const intersection = intersects[0];
        const segment = intersection.object;
        const data = segment.userData;

        tooltipRef.current.style.display = 'block';
        tooltipRef.current.style.left = `${event.clientX - rect.left + 10}px`;
        tooltipRef.current.style.top = `${event.clientY - rect.top + 10}px`;
        tooltipRef.current.innerHTML = `
          <div class="font-semibold">${data.name}</div>
          <div>${formatCurrency(data.value)}</div>
          <div>${data.percentage}%</div>
        `;

        // Highlight segment
        segments3D.forEach(s => {
          (s.material as THREE.MeshPhongMaterial).opacity = s === segment ? 1 : 0.6;
        });
      } else {
        tooltipRef.current.style.display = 'none';
        segments3D.forEach(s => {
          (s.material as THREE.MeshPhongMaterial).opacity = 0.8;
        });
      }
    };

    containerRef.current.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      
      // Dispose of geometries and materials
      segments3D.forEach(segment => {
        segment.geometry.dispose();
        (segment.material as THREE.Material).dispose();
      });
    };
  }, [data]);

  return (
    <>
      <div ref={containerRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden bg-white/90 dark:bg-gray-800/90 p-2 rounded shadow-lg text-sm z-10"
      />
    </>
  );
};