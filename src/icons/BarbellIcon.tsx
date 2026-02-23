import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface BarbellIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const BarbellIcon: React.FC<BarbellIconProps> = ({ 
  size = 24, 
  color = '#000',
  filled = false 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="9"
        width="2"
        height="6"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Rect
        x="6"
        y="7"
        width="2"
        height="10"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Rect
        x="16"
        y="7"
        width="2"
        height="10"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Rect
        x="20"
        y="9"
        width="2"
        height="6"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M8 12H16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};