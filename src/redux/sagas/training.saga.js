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

    } catch (error) {
        console.error("ERROR adding a new training:", error);
    }
}

function* trainingSaga() {
    yield takeLatest("FETCH_TRAININGS", fetchTrainings);
}

export default trainingSaga;