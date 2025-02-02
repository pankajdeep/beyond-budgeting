import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { formatCurrency } from '@/lib/utils';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ThreeDChartProps {
  data: CategoryData[];
  onCategoryClick?: (category: string) => void;
}

const SpendingShape = ({ data, onCategoryClick }: ThreeDChartProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  if (!data || data.length === 0) {
    console.log('No data available for SpendingShape');
    return null;
  }

  const totalValue = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  
  if (totalValue <= 0) {
    console.log('Total value is 0 or negative');
    return null;
  }

  const segments = data.map((item, index) => {
    const value = Number(item.value) || 0;
    const angle = (value / totalValue) * Math.PI * 2;
    return {
      ...item,
      angle,
      startAngle: index === 0 ? 0 : data
        .slice(0, index)
        .reduce((sum, prev) => sum + ((Number(prev.value) || 0) / totalValue) * Math.PI * 2, 0),
    };
  });

  return (
    <group>
      {segments.map((segment, index) => {
        const radius = 2;
        const height = segment.value > 0 ? (segment.value / totalValue) * 2 + 0.5 : 0.5;
        const segments = 32;
        
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, radius, segment.startAngle, segment.startAngle + segment.angle, false);
        shape.lineTo(0, 0);

        const extrudeSettings = {
          steps: 1,
          depth: height,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelSegments: 5
        };

        return (
          <mesh
            key={index}
            position={[0, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(segment.name);
            }}
            onPointerOut={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              if (onCategoryClick) {
                onCategoryClick(segment.name);
              }
            }}
          >
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshPhongMaterial
              color={segment.color}
              opacity={hovered === segment.name ? 0.8 : 0.6}
              transparent
              shininess={30}
            />
            {hovered === segment.name && (
              <Text
                position={[
                  Math.cos(segment.startAngle + segment.angle / 2) * (radius + 0.5),
                  Math.sin(segment.startAngle + segment.angle / 2) * (radius + 0.5),
                  height + 0.5
                ]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {formatCurrency(segment.value)}
              </Text>
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export const ThreeDChart = ({ data, onCategoryClick }: ThreeDChartProps) => {
  console.log('ThreeDChart received data:', data);

  if (!data || data.length === 0) {
    return <div className="h-[400px] w-full flex items-center justify-center">No data available</div>;
  }

  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SpendingShape data={data} onCategoryClick={onCategoryClick} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};