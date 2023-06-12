import { createSlice } from '@reduxjs/toolkit';

import { medsInfo } from 'pages/TreatmentPage';
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
    changePillsInSchedule(state, action) {
      const index = state.schedule.findIndex((item: medsInfo) => item.id === action.payload.medsId);

      const oldNotificationTime = state.schedule[index].notificationTime;

      const newNotificationTime = oldNotificationTime.map((item) => {
        if (item.id === action.payload.dateId) {
          return {
            ...item,
            time: action.payload.newTime,
          };
        } else {
          return item;
        }
      });

      state.schedule[index].notificationTime = newNotificationTime;
    },
  },
});

// newDate: date.toString(),
//       dateId,
//       medsId: id,

export const { addNewPillsToSchedule, changePillsInSchedule } = medsScheduleSlice.actions;

export default medsScheduleSlice.reducer;
