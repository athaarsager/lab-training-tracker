import { combineReducers } from "redux";
import people from "./people.reducer";
import selectedPerson from "./selectedPerson.reducer";
import testStatuses from "./testStatuses.reducer";

const rootReducer = combineReducers({
    people,
    selectedPerson,
    testStatuses,
});

export default rootReducer;

