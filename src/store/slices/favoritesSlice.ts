import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../../api/types';

interface FavoritesState {
  exercises: Exercise[];
}

const initialState: FavoritesState = {
  exercises: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Exercise>) => {
      const exists = state.exercises.find(ex => ex.id === action.payload.id);
      if (!exists) {
        state.exercises.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(ex => ex.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.exercises = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
