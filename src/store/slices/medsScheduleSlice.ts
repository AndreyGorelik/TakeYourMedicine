import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schedule: [],
};

const medsScheduleSlice = createSlice({
  name: 'medsScheduleSlice',
  initialState,
  reducers: {
    addNewPillsToSchedule(state, action) {
      state.schedule.push(action.payload);
    },
  },
});

export const { addNewPillsToSchedule } = medsScheduleSlice.actions;

export default medsScheduleSlice.reducer;
