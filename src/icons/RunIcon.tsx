import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface RunIconProps {
  size?: number;
  color?: string;
}

export const RunIcon: React.FC<RunIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle cx="12" cy="4" r="2" fill={color} />
      
      {/* Body and limbs */}
      <Path
        d="M10.5 7.5C10.5 7.5 11.5 7 12.5 7C13.5 7 14.5 7.5 14.5 7.5L15 10L13 11L12 9L11 11L9 10L10.5 7.5Z"
        fill={color}
      />
      
      {/* Running legs */}
      <Path
        d="M11 11L10 16L8 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 11L14 16L16 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Arms */}
      <Path
        d="M9 10L7 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M15 10L17 8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};