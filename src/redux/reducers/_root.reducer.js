// import { combineReducers } from "redux";
import { combineReducers } from 'redux';
import peopleReducer from './people.reducer';
import selectedPersonReducer from './selectedPerson.reducer';
import trainingStatuses from './trainingStatuses.reducer';
import trainings from './trainings.reducer';
import selectedTraining from './selectedTrainingReducer';

const rootReducer = combineReducers({
  people: peopleReducer,
  selectedPerson: selectedPersonReducer,
  trainingStatuses,
  trainings,
  selectedTraining,
});

export default rootReducer;
