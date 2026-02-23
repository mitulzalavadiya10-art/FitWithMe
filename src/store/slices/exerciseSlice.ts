import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Exercise } from '../../api/types';
import { exerciseService } from '../../api/exerciseService';

interface ExerciseState {
  exercises: Exercise[];
  selectedExercise: Exercise | null;
  bodyParts: string[];
  equipment: string[];
  targets: string[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentOffset: number;
}

const initialState: ExerciseState = {
  exercises: [],
  selectedExercise: null,
  bodyParts: [],
  equipment: [],
  targets: [],
  isLoading: false,
  error: null,
  hasMore: true,
  currentOffset: 0,
};

// Async thunks
export const fetchExercises = createAsyncThunk(
  'exercise/fetchExercises',
  async (params: { offset?: number; limit?: number } = {}) => {
    const exercises = await exerciseService.getAllExercises(params);
    return { exercises, offset: params.offset || 0 };
  }
);

export const fetchExerciseById = createAsyncThunk(
  'exercise/fetchExerciseById',
  async (id: string) => {
    return await exerciseService.getExerciseById(id);
  }
);

export const fetchExercisesByBodyPart = createAsyncThunk(
  'exercise/fetchExercisesByBodyPart',
  async ({ bodyPart, ...params }: { bodyPart: string; offset?: number; limit?: number }) => {
    return await exerciseService.getExercisesByBodyPart(bodyPart, params);
  }
);

export const searchExercises = createAsyncThunk(
  'exercise/searchExercises',
  async ({ name, ...params }: { name: string; offset?: number; limit?: number }) => {
    return await exerciseService.searchExercisesByName(name, params);
  }
);

export const fetchBodyParts = createAsyncThunk(
  'exercise/fetchBodyParts',
  async () => {
    return await exerciseService.getBodyPartList();
  }
);

export const fetchEquipment = createAsyncThunk(
  'exercise/fetchEquipment',
  async () => {
    return await exerciseService.getEquipmentList();
  }
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setSelectedExercise: (state, action: PayloadAction<Exercise | null>) => {
      state.selectedExercise = action.payload;
    },
    clearExercises: (state) => {
      state.exercises = [];
      state.currentOffset = 0;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch exercises
    builder.addCase(fetchExercises.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.offset === 0) {
        state.exercises = action.payload.exercises;
      } else {
        state.exercises = [...state.exercises, ...action.payload.exercises];
      }
      state.currentOffset = action.payload.offset;
      state.hasMore = action.payload.exercises.length > 0;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch exercises';
    });

    // Fetch exercise by ID
    builder.addCase(fetchExerciseById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchExerciseById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedExercise = action.payload;
    });
    builder.addCase(fetchExerciseById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch exercise';
    });

    // Fetch exercises by body part
    builder.addCase(fetchExercisesByBodyPart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchExercisesByBodyPart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercises = action.payload;
    });
    builder.addCase(fetchExercisesByBodyPart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch exercises';
    });

    // Search exercises
    builder.addCase(searchExercises.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchExercises.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercises = action.payload;
    });
    builder.addCase(searchExercises.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to search exercises';
    });

    // Fetch body parts
    builder.addCase(fetchBodyParts.fulfilled, (state, action) => {
      state.bodyParts = action.payload;
    });

    // Fetch equipment
    builder.addCase(fetchEquipment.fulfilled, (state, action) => {
      state.equipment = action.payload;
    });
  },
});

export const { setSelectedExercise, clearExercises, clearError } = exerciseSlice.actions;

export default exerciseSlice.reducer;
