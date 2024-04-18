import { combineReducers } from "redux";
import people from "./people.reducer";
import selectedPerson from "./selectedPerson.reducer";

const rootReducer = combineReducers({
    people,
    selectedPerson,
});

export default rootReducer;

