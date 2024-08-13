import { createSlice } from '@reduxjs/toolkit';

const selectedTrainingSlice = createSlice({
  name: 'select_training',
  initialState: {},
  reducers: {
    allSelectedTraining(state, action) {
      return action.payload;
    },
    clearSelectedTraining() {
      return {};
    },
  },
});

export const { allSelectedTraining, clearSelectedTraining } = selectedTrainingSlice.actions;

export default selectedTrainingSlice.reducer;
