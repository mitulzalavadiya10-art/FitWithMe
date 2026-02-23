import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../store/hooks';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { theme } from '../theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, onboardingCompleted } = useAppSelector(state => state.auth);
  const { profile } = useAppSelector(state => state.user);

  const isProfileComplete = profile?.gender && profile?.age && profile?.weight && profile?.height;

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary,
        },
      }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated || !onboardingCompleted || !isProfileComplete ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
