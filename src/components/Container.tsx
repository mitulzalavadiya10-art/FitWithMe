import React from 'react';
import { View, StyleSheet, ViewStyle, SafeAreaView } from 'react-native';
import { theme } from '../theme';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safe?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, style, safe = true }) => {
  const Wrapper = safe ? SafeAreaView : View;
  return <Wrapper style={[styles.container, style]}>{children}</Wrapper>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
