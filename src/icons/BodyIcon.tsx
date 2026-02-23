import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface BodyIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const BodyIcon: React.FC<BodyIconProps> = ({ 
  size = 24, 
  color = '#000',
  filled = false 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle 
        cx="12" 
        cy="5" 
        r="2" 
        fill={filled ? color : 'none'}
        stroke={color} 
        strokeWidth={2} 
      />
      
      {/* Torso */}
      <Path
        d="M12 7V17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Shoulders */}
      <Path
        d="M8 9L12 7L16 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Arms */}
      <Path
        d="M8 9V13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16 9V13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Legs */}
      <Path
        d="M10 17V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14 17V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};