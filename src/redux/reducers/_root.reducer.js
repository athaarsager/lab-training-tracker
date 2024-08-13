// import { combineReducers } from "redux";
import { combineReducers } from 'redux';
import peopleReducer from './people.reducer';
import selectedPersonReducer from './selectedPerson.reducer';
import trainingStatusReducer from './trainingStatuses.reducer';
import trainingsReducer from './trainings.reducer';
import selectedTrainingReducer from './selectedTrainingReducer';

const rootReducer = combineReducers({
  people: peopleReducer,
  selectedPerson: selectedPersonReducer,
  trainingStatuses: trainingStatusReducer,
  trainings: trainingsReducer,
  selectedTraining: selectedTrainingReducer,
});

export default rootReducer;
