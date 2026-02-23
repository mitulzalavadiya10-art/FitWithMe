import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TrendingDownIconProps {
  size?: number;
  color?: string;
}

export const TrendingDownIcon: React.FC<TrendingDownIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 18L13.5 8.5L8.5 13.5L1 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 18H23V12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};