import { combineReducers } from "redux";
import people from "./people.reducer";
import selectedPerson from "./selectedPerson.reducer";
import trainingStatuses from "./trainingStatuses.reducer";
import trainings from "./trainings.reducer";
import selectedTraining from "./selectedTrainingReducer";

const rootReducer = combineReducers({
    people,
    selectedPerson,
    trainingStatuses,
    trainings,
    selectedTraining
});

export default rootReducer;

