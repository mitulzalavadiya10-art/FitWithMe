import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarbellIcon, SearchOutlineIcon } from '../icons';
import { theme } from '../theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
}

const getIconComponent = (iconName: string, size: number, color: string) => {
  switch (iconName) {
    case 'barbell-outline':
      return <BarbellIcon size={size} color={color} filled={false} />;
    case 'search-outline':
      return <SearchOutlineIcon size={size} color={color} />;
    default:
      return <BarbellIcon size={size} color={color} filled={false} />;
  }
};

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
  return (
    <View style={styles.container}>
      {getIconComponent(icon, 64, theme.colors.textTertiary)}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
