import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationSettings {
  workoutReminders: boolean;
  workoutSystem: boolean;
  challenges: boolean;
  community: boolean;
}

interface SettingsState {
  notifications: NotificationSettings;
  language: string;
  units: 'metric' | 'imperial';
}

const initialState: SettingsState = {
  notifications: {
    workoutReminders: true,
    workoutSystem: true,
    challenges: true,
    community: true,
  },
  language: 'en',
  units: 'metric',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setUnits: (state, action: PayloadAction<'metric' | 'imperial'>) => {
      state.units = action.payload;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  updateNotificationSettings,
  setLanguage,
  setUnits,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
