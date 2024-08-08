import { createSlice } from '@reduxjs/toolkit';

const trainingStatusSlice = createSlice({
  name: 'trainingStatus',
  initialState: [],
  reducers: {
    allTrainingStatus(state, action) {
      return action.payload;
    },
    clearTrainingStatus(state) {
      return state;
    },
  },
});

export const { allTrainingStatus, clearTrainingStatus } = trainingStatusSlice.actions;

export default trainingStatusSlice.reducer;
