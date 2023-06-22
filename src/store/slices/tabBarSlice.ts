import { createSlice } from '@reduxjs/toolkit';

interface State {
  range: number;
}

const initialState: State = {
  range: 20,
};

const tabBarSlice = createSlice({
  name: 'tabBarSlice',
  initialState,
  reducers: {
    changeTabBarProgress(state, action) {
      state.range = action.payload;
    },
  },
});

export const { changeTabBarProgress } = tabBarSlice.actions;

export default tabBarSlice.reducer;
