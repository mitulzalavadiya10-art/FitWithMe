import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface FitnessIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const FitnessIcon: React.FC<FitnessIconProps> = ({ 
  size = 24, 
  color = '#000',
  filled = false 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Dumbbell representation */}
      <Circle
        cx="6"
        cy="12"
        r="3"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Circle
        cx="18"
        cy="12"
        r="3"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M9 12H15"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
};