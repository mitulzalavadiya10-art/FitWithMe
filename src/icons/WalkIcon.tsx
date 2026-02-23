import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface WalkIconProps {
  size?: number;
  color?: string;
}

export const WalkIcon: React.FC<WalkIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle cx="13" cy="4" r="2" fill={color} />
      
      {/* Body */}
      <Path
        d="M13 6V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Arms */}
      <Path
        d="M11 8L13 6L15 8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 8V11"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M15 8V11"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Walking legs */}
      <Path
        d="M11 14L10 18L9 22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 14L16 18L17 22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Feet */}
      <Path
        d="M8 22H10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16 22H18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};