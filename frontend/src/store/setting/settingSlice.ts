import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  multiTab: boolean;
};

const initialSettings: SettingsType = getItem<SettingsType>(StorageEnum.Settings) || {
  themeColorPresets: ThemeColorPresets.Default,
  themeMode: ThemeMode.Light,
  themeLayout: ThemeLayout.Vertical,
  themeStretch: false,
  breadCrumb: true,
  multiTab: true,
};
console.log(initialSettings,ThemeMode.Light)

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettings,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsType>) => {
      Object.assign(state, action.payload);
      setItem(StorageEnum.Settings, action.payload);
    },
    clearSettings: (state) => {
      Object.assign(state, initialSettings);
      removeItem(StorageEnum.Settings);
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;

export default settingsSlice.reducer



