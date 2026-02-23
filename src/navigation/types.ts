// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ProfileSetup: undefined;
};

export type ProfileSetupStackParamList = {
  Gender: undefined;
  Age: undefined;
  Weight: undefined;
  Height: undefined;
  Goal: undefined;
  ActivityLevel: undefined;
  ProfileComplete: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  ExerciseDetail: { exerciseId: string };
  WorkoutLog: { exerciseId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  PasswordSettings: undefined;
  Help: undefined;
};
