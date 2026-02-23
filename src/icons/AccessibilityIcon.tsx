import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface AccessibilityIconProps {
  size?: number;
  color?: string;
}

export const AccessibilityIcon: React.FC<AccessibilityIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle cx="12" cy="4" r="2" stroke={color} strokeWidth={2} />
      
      {/* Body */}
      <Path
        d="M12 6V16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Arms spread wide (shoulders) */}
      <Path
        d="M6 10L12 8L18 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 10V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M18 10V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Legs */}
      <Path
        d="M10 16V20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14 16V20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Base/feet */}
      <Path
        d="M8 20H12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M12 20H16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};