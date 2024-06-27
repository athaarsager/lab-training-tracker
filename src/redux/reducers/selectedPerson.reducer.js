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

// const selectedPersonReducer = (state = {}, action) => {
//     switch (action.type) {
//         case "SET_SELECTED_PERSON":
//             return action.payload;
//         case "CLEAR_SELECTED_PERSON":
//             return {};
//         default:
//             return state;
//     }
// }

// export default selectedPersonReducer;
