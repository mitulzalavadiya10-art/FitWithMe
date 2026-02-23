import { TrendingDownIcon, FitnessIcon, HeartIcon, RunIcon } from '../icons';

// App Constants
export const APP_NAME = 'Fit With Me';

// API Configuration - API Ninjas Exercises API (FREE)
export const API_CONFIG = {
  BASE_URL: 'https://api.api-ninjas.com/v1',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// AsyncStorage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@fit_with_me:user_token',
  USER_DATA: '@fit_with_me:user_data',
  ONBOARDING_COMPLETED: '@fit_with_me:onboarding_completed',
  FAVORITES: '@fit_with_me:favorites',
  WORKOUT_LOGS: '@fit_with_me:workout_logs',
  SETTINGS: '@fit_with_me:settings',
};

// Fitness Goals
export const FITNESS_GOALS = [
  { id: 'lose_weight', label: 'Lose Weight', icon: 'trending-down', IconComponent: TrendingDownIcon },
  { id: 'build_muscle', label: 'Build Muscle', icon: 'fitness', IconComponent: FitnessIcon },
  { id: 'stay_fit', label: 'Stay Fit', icon: 'heart', IconComponent: HeartIcon },
  { id: 'improve_endurance', label: 'Improve Endurance', icon: 'run', IconComponent: RunIcon },
];

// Activity Levels
export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { id: 'light', label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
  { id: 'moderate', label: 'Moderately Active', description: 'Exercise 3-5 days/week' },
  { id: 'very', label: 'Very Active', description: 'Exercise 6-7 days/week' },
  { id: 'extra', label: 'Extra Active', description: 'Hard exercise daily' },
];

// Workout Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { id: 'beginner', label: 'Beginner', color: '#00D4AA' },
  { id: 'intermediate', label: 'Intermediate', color: '#FFA726' },
  { id: 'advanced', label: 'Advanced', color: '#FF5757' },
];

// Body Parts (from ExerciseDB)
export const BODY_PARTS = [
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
];

// Equipment Types
export const EQUIPMENT_TYPES = [
  'assisted',
  'band',
  'barbell',
  'body weight',
  'bosu ball',
  'cable',
  'dumbbell',
  'elliptical machine',
  'ez barbell',
  'hammer',
  'kettlebell',
  'leverage machine',
  'medicine ball',
  'olympic barbell',
  'resistance band',
  'roller',
  'rope',
  'skierg machine',
  'sled machine',
  'smith machine',
  'stability ball',
  'stationary bike',
  'stepmill machine',
  'tire',
  'trap bar',
  'upper body ergometer',
  'weighted',
  'wheel roller',
];

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 50,
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_AGE: 13,
  MAX_AGE: 120,
  MIN_WEIGHT: 30,
  MAX_WEIGHT: 300,
  MIN_HEIGHT: 100,
  MAX_HEIGHT: 250,
};
