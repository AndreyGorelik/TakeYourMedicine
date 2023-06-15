import { createSlice } from '@reduxjs/toolkit';

interface State {
  darkMode: boolean;
}

const initialState: State = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    changeTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
