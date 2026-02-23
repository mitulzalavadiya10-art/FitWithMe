import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlayIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const PlayIcon: React.FC<PlayIconProps> = ({ 
  size = 24, 
  color = '#000',
  filled = true 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 5V19L19 12L8 5Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};