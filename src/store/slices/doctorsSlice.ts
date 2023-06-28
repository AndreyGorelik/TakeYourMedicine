import { createSlice } from '@reduxjs/toolkit';

import { DoctorVisit } from 'pages/DoctorAppointment';
interface State {
  doctorVisits: DoctorVisit[];
}

const initialState: State = {
  doctorVisits: [],
};

const doctorsSlice = createSlice({
  name: 'medsScheduleSlice',
  initialState,
  reducers: {
    saveAppointment(state, action) {
      state.doctorVisits.push(action.payload);
    },
  },
});

export const { saveAppointment } = doctorsSlice.actions;

export default doctorsSlice.reducer;
