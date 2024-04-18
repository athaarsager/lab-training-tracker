import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Fetch all trainings for display on trainings page
function* fetchTrainings() {
    try {
        const trainingsResult = yield axios.get("/api/training");
        yield put({ type: "SET_TRAININGS", payload: trainingsResult });
    } catch (error) {
        console.error("ERROR fetching all trainings:", error);
    }
}

// Add a new training to the system
function* addTraining(action) {
    try {
        // action.payload will be a training object
        yield axios.post("/api/training", action.payload);
        // trainings will be added on the trainings page, so need to refresh the list of trainings
        yield put({ type: "FETCH_TRAININGS" });
    } catch (error) {
        console.error("ERROR adding a new training:", error);
    }
}

// Add a new entry to the person_training table if a person has completed a training for the first time
function* addPersonTrainingEntry(action) {
    try {
        // action.payload will be object with the following keys: person_id, training_id
        yield axios.post(`/api/training/${action.payload.person_id}`, action.payload);
        // need to update this information on the selected person's page
        yield put({ type: "FETCH_SELECTED_PERSON_INFO", payload: action.payload.person_id });
    } catch(error) {
        console.error("ERROR in adding a training entry for a specific person:", error);
    }
}

function* trainingSaga() {
    yield takeLatest("FETCH_TRAININGS", fetchTrainings);
    yield takeLatest("ADD_TRAINING", addTraining);
    yield takeLatest("ADD_PERSON_TRAINING_ENTRY", addPersonTrainingEntry);
}

export default trainingSaga;