import { createSlice } from '@reduxjs/toolkit';

const peopleSlice = createSlice({
  name: 'people',
  initialState: [],
  reducers: {
    allPeople(state, action) {
      return action.payload;
    },
  },
});

export const { allPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
