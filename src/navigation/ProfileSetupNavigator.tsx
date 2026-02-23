import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileSetupStackParamList } from './types';

// Screens
import GenderScreen from '../screens/profileSetup/GenderScreen';
import AgeScreen from '../screens/profileSetup/AgeScreen';
import WeightScreen from '../screens/profileSetup/WeightScreen';
import HeightScreen from '../screens/profileSetup/HeightScreen';
import GoalScreen from '../screens/profileSetup/GoalScreen';
import ActivityLevelScreen from '../screens/profileSetup/ActivityLevelScreen';
import ProfileCompleteScreen from '../screens/profileSetup/ProfileCompleteScreen';

const Stack = createStackNavigator<ProfileSetupStackParamList>();

const ProfileSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Age" component={AgeScreen} />
      <Stack.Screen name="Weight" component={WeightScreen} />
      <Stack.Screen name="Height" component={HeightScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
      <Stack.Screen name="ProfileComplete" component={ProfileCompleteScreen} />
    </Stack.Navigator>
  );
};

export default ProfileSetupNavigator;
