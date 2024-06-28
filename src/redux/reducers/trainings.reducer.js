import { createSlice } from '@reduxjs/toolkit';

const trainingSlice = createSlice({
  name: 'training',
  initialState: [],
  reducers: {
    allTraining(state, action) {
      return action.payload;
    },
  },
});

export const { allTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
