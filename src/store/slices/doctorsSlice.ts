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
    saveNewAppointment(state, { payload }: { payload: DoctorVisit }) {
      state.doctorVisits.push(payload);
    },
    saveEditedAppointment(state, { payload }: { payload: DoctorVisit }) {
      const index = state.doctorVisits.findIndex((item) => item.id === payload.id);
      state.doctorVisits[index] = payload;
    },
  },
});

export const { saveNewAppointment, saveEditedAppointment } = doctorsSlice.actions;

export default doctorsSlice.reducer;
