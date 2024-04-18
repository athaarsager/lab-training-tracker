import { combineReducers } from "redux";
import people from "./people.reducer";
import selectedPerson from "./selectedPerson.reducer";
import testStatuses from "./testStatuses.reducer";
import trainings from "./trainings.reducer";

const rootReducer = combineReducers({
    people,
    selectedPerson,
    testStatuses,
    trainings
});

export default rootReducer;

