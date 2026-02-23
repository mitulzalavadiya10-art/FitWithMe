import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkoutStackParamList } from './types';

// Screens
import WorkoutListScreen from '../screens/workouts/WorkoutListScreen';
import ExerciseDetailScreen from '../screens/workouts/ExerciseDetailScreen';
import WorkoutLogScreen from '../screens/workouts/WorkoutLogScreen';

const Stack = createStackNavigator<WorkoutStackParamList>();

const WorkoutsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutList" component={WorkoutListScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="WorkoutLog" component={WorkoutLogScreen} />
    </Stack.Navigator>
  );
};

export default WorkoutsNavigator;
