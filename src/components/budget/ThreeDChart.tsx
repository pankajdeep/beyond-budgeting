import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { formatCurrency } from '@/lib/utils';

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
}

interface ThreeDChartProps {
  data: CategoryData[];
  isDarkMode?: boolean;
}

const CategoryRing = ({ data, index, total, hovered, setHovered }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 2;
  const thickness = 0.3;
  const startAngle = (index / total) * Math.PI * 2;
  const endAngle = ((index + 1) / total) * Math.PI * 2;

  const geometry = new THREE.RingGeometry(
    radius - thickness,
    radius,
    32,
    1,
    startAngle,
    (endAngle - startAngle)
  );

  const color = new THREE.Color();
  color.setHSL(index * (1 / total), 0.7, 0.5);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={() => setHovered(data)}
      onPointerOut={() => setHovered(null)}
    >
      <meshPhongMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={hovered?.name === data.name ? 0.9 : 0.7}
      />
    </mesh>
  );
};

export const ThreeDChart = ({ data, isDarkMode = false }: ThreeDChartProps) => {
  const [hovered, setHovered] = useState<CategoryData | null>(null);
  const total = data.length;

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <group rotation={[0.5, 0, 0]}>
          {data.map((category, index) => (
            <CategoryRing
              key={category.name}
              data={category}
              index={index}
              total={total}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </group>
        <OrbitControls enableZoom={false} />
      </Canvas>
      {hovered && (
        <div
          className="absolute top-4 left-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border shadow-lg animate-fadeIn"
        >
          <p className="font-semibold text-lg">{hovered.name}</p>
          <p className="text-sm text-muted-foreground">
            Amount: {formatCurrency(hovered.value)}
          </p>
          <p className="text-sm text-muted-foreground">
            {hovered.percentage.toFixed(1)}% of total
          </p>
        </div>
      )}
    </div>
  );
};