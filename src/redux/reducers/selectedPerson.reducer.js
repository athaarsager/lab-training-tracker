import { createSlice } from '@reduxjs/toolkit';

const selectedPersonSlice = createSlice({
  name: 'person',
  initialState: {},
  reducers: {
    selectPerson(state, action) {
      return action.payload;
    },
    clearSelectedPerson() {
      return {};
    },
  },
});

export const { selectPerson, clearSelectedPerson } = selectedPersonSlice.actions;

export default selectedPersonSlice.reducer;
