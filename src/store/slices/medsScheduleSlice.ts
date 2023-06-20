import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import { medsInfo } from 'pages/TreatmentPage';
import { noPhoto } from '../../assets/images';
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
    switchNotifications(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload);
      state.schedule[index].notificationsOnOff = !state.schedule[index].notificationsOnOff;
    },
    deleteNotificationTime(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);

      const timeIndex = state.schedule[index].notificationTime.findIndex(
        (item) => item.id === action.payload.notificationId
      );

      state.schedule[index].notificationTime.splice(timeIndex, 1);
    },
    addNotificationTime(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload);
      state.schedule[index].notificationTime.push({
        time: new Date().toString(),
        id: uuid.v4().toString(),
      });
    },
    deletePhoto(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload);
      state.schedule[index].photo = noPhoto;
    },
    updatePhoto(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);
      state.schedule[index].photo = action.payload.photo;
    },
    changeMedsSupply(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);
      state.schedule[index].medsSupply = action.payload.count;
    },
    changeMedsRest(state, action) {
      const index = state.schedule.findIndex((item) => item.id === action.payload.id);
      state.schedule[index].medsRest = action.payload.count;
    },
  },
});

export const {
  addNewPillsToSchedule,
  changePillsInSchedule,
  switchNotifications,
  deleteNotificationTime,
  addNotificationTime,
  deletePhoto,
  updatePhoto,
  changeMedsSupply,
  changeMedsRest,
} = medsScheduleSlice.actions;

export default medsScheduleSlice.reducer;
