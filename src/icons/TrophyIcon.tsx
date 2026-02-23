import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TrophyIconProps {
  size?: number;
  color?: string;
}

export const TrophyIcon: React.FC<TrophyIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9H4.5C3.67157 9 3 9.67157 3 10.5V12C3 13.6569 4.34315 15 6 15H6.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 9H19.5C20.3284 9 21 9.67157 21 10.5V12C21 13.6569 19.6569 15 18 15H17.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 15C6.5 17.2091 8.29086 19 10.5 19H13.5C15.7091 19 17.5 17.2091 17.5 15V9C17.5 6.79086 15.7091 5 13.5 5H10.5C8.29086 5 6.5 6.79086 6.5 9V15Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19V22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M8 22H16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};