import { createSlice } from '@reduxjs/toolkit';

import { medsInfo } from 'pages/TreatmentPage';

import { noPhoto } from '../../assets/images';
import cancelNotification from '../../utils/cancelNotification';
interface State {
  schedule: medsInfo[];
}

const initialState: State = {
  schedule: [],
};

const medsScheduleSlice = createSlice({
  name: 'medsScheduleSlice',
  initialState,
  reducers: {
    addNewPillsToSchedule(state, action) {
      state.schedule.push(action.payload);
    },
    cancelAllNotifications(state) {
      state.schedule.forEach((item) => {
        cancelNotification(item.id);
        item.notificationsOnOff = false;
      });
    },
    updateScheduleItem(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);
      state.schedule[index] = action.payload;
    },
    deletePhoto(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload);
      state.schedule[index].photo = noPhoto;
    },
    updatePhoto(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);
      state.schedule[index].photo = action.payload.photo;
    },
    decrementMedsSupply(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload);
      if (state.schedule[index].medsSupply) {
        state.schedule[index].medsSupply = (+state.schedule[index].medsSupply - 1).toString();
      }
    },
    deleteScheduleItems(state, action) {
      state.schedule = state.schedule.filter((item) => !action.payload.includes(item.id));
    },
  },
});

export const {
  addNewPillsToSchedule,
  deletePhoto,
  updatePhoto,
  cancelAllNotifications,
  decrementMedsSupply,
  deleteScheduleItems,
  updateScheduleItem,
} = medsScheduleSlice.actions;

export default medsScheduleSlice.reducer;
