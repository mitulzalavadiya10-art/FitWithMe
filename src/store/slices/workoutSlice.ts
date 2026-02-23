import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../../api/types';

export interface WorkoutLog {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  notes?: string;
  completed: boolean;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  createdAt: string;
  isCustom: boolean;
}

interface WorkoutState {
  workoutLogs: WorkoutLog[];
  routines: WorkoutRoutine[];
  activeWorkout: WorkoutLog | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  workoutLogs: [],
  routines: [],
  activeWorkout: null,
  isLoading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkoutLog: (state, action: PayloadAction<WorkoutLog>) => {
      state.workoutLogs.unshift(action.payload);
    },
    updateWorkoutLog: (state, action: PayloadAction<WorkoutLog>) => {
      const index = state.workoutLogs.findIndex(log => log.id === action.payload.id);
      if (index !== -1) {
        state.workoutLogs[index] = action.payload;
      }
    },
    deleteWorkoutLog: (state, action: PayloadAction<string>) => {
      state.workoutLogs = state.workoutLogs.filter(log => log.id !== action.payload);
    },
    setActiveWorkout: (state, action: PayloadAction<WorkoutLog | null>) => {
      state.activeWorkout = action.payload;
    },
    addRoutine: (state, action: PayloadAction<WorkoutRoutine>) => {
      state.routines.push(action.payload);
    },
    updateRoutine: (state, action: PayloadAction<WorkoutRoutine>) => {
      const index = state.routines.findIndex(routine => routine.id === action.payload.id);
      if (index !== -1) {
        state.routines[index] = action.payload;
      }
    },
    deleteRoutine: (state, action: PayloadAction<string>) => {
      state.routines = state.routines.filter(routine => routine.id !== action.payload);
    },
    clearWorkoutLogs: (state) => {
      state.workoutLogs = [];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog,
  setActiveWorkout,
  addRoutine,
  updateRoutine,
  deleteRoutine,
  clearWorkoutLogs,
  setError,
  clearError,
} = workoutSlice.actions;

export default workoutSlice.reducer;
