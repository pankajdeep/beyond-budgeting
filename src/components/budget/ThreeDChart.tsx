import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
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

const CategoryRing = ({ 
  data, 
  index, 
  total, 
  hovered, 
  setHovered 
}: { 
  data: CategoryData; 
  index: number; 
  total: number; 
  hovered: CategoryData | null; 
  setHovered: (data: CategoryData | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 2;
  const thickness = 0.3;
  
  // Ensure we have valid numbers for angle calculations
  const safeIndex = Number.isFinite(index) ? index : 0;
  const safeTotal = Number.isFinite(total) && total > 0 ? total : 1;
  
  const startAngle = (safeIndex / safeTotal) * Math.PI * 2;
  const endAngle = ((safeIndex + 1) / safeTotal) * Math.PI * 2;

  // Create geometry only if we have valid angles
  const geometry = new THREE.RingGeometry(
    radius - thickness,
    radius,
    32,
    1,
    startAngle,
    endAngle - startAngle
  );

  // Generate a consistent color based on index
  const color = new THREE.Color();
  color.setHSL(safeIndex * (1 / safeTotal), 0.7, 0.5);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(data);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(null);
      }}
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

export const ThreeDChart = ({ data = [], isDarkMode = false }: ThreeDChartProps) => {
  const [hovered, setHovered] = useState<CategoryData | null>(null);
  const total = Array.isArray(data) ? data.length : 0;

  // Early return if no data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No data available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: isDarkMode ? '#1a1a1a' : '#ffffff' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <group rotation={[0.5, 0, 0]}>
          {data.map((category, index) => (
            <CategoryRing
              key={`${category.name}-${index}`}
              data={category}
              index={index}
              total={total}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </group>
        
        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
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