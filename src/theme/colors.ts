// Dark Theme Colors for Fit With Me App
export const colors = {
  // Primary Colors
  primary: '#FF6B35',        // Orange/Red accent
  primaryDark: '#E85A2A',
  primaryLight: '#FF8555',
  
  // Background Colors
  background: '#0A0E27',     // Deep dark blue
  backgroundSecondary: '#151932',
  backgroundTertiary: '#1E2440',
  card: '#1E2440',
  
  // Text Colors
  text: '#FFFFFF',
  textSecondary: '#A0A3BD',
  textTertiary: '#6E7191',
  textDisabled: '#4E4F66',
  
  // Status Colors
  success: '#00D4AA',
  error: '#FF5757',
  warning: '#FFA726',
  info: '#42A5F5',
  
  // UI Elements
  border: '#2E3350',
  divider: '#252A43',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Gradient Colors
  gradientStart: '#FF6B35',
  gradientEnd: '#FF8555',
  
  // Specific UI
  inputBackground: '#1E2440',
  inputBorder: '#2E3350',
  buttonDisabled: '#2E3350',
  
  // Chart Colors
  chartPrimary: '#FF6B35',
  chartSecondary: '#00D4AA',
  chartTertiary: '#42A5F5',
  
  // Transparent
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorKeys = keyof typeof colors;
