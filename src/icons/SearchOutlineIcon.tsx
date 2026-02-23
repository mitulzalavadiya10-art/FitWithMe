import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface SearchOutlineIconProps {
  size?: number;
  color?: string;
}

export const SearchOutlineIcon: React.FC<SearchOutlineIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="8"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
      <Path
        d="M21 21L16.65 16.65"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
    </Svg>
  );
};