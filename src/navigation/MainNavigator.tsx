import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { theme } from '../theme';
import ModernTabBar, { InteractiveMenuItem } from '../components/ModernTabBar';

// Screens
import HomeScreen from '../screens/main/HomeScreen';
import WorkoutsNavigator from './WorkoutsNavigator';
import SearchScreen from '../screens/main/SearchScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom tab items matching the web component structure
const customTabItems: InteractiveMenuItem[] = [
  { label: 'home', icon: 'home', key: 'Home' },
  { label: 'workouts', icon: 'workouts', key: 'Workouts' },
  { label: 'search', icon: 'search', key: 'Search' },
  { label: 'favorites', icon: 'favorites', key: 'Favorites' },
  { label: 'profile', icon: 'profile', key: 'Profile' },
];

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <ModernTabBar 
          {...props} 
          items={customTabItems}
          accentColor={theme.colors.primary}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutsNavigator}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
