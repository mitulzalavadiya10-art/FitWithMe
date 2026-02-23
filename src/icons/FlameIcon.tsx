import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FlameIconProps {
  size?: number;
  color?: string;
}

export const FlameIcon: React.FC<FlameIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 14.5C8.5 16.9853 10.5147 19 13 19C15.4853 19 17.5 16.9853 17.5 14.5C17.5 12.0147 13 5 13 5S8.5 12.0147 8.5 14.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16C11.4477 16 11 15.5523 11 15C11 14.4477 12 12 12 12S13 14.4477 13 15C13 15.5523 12.5523 16 12 16Z"
        fill={color}
      />
    </Svg>
  );
};