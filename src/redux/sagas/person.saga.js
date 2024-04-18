import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// get all people
function* fetchPeople() {
    try {
        const peopleResult = yield axios.get("/api/person");
        yield put({ type: "SET_PEOPLE", payload: peopleResult});
    } catch (error) {
        console.error("ERROR in fetchPeople generator:", error);
    }
}

// get individual person's info for display. Including test info in this generator
function* fetchSelectedPersonInfo(action) {
    try {
        // action.payload will be the selected person's id
        const selectedPersonResult = yield axios.get(`/api/person/${action.payload}`);
        const testStatusesResult = yield axios.get(`/api/training/${action.payload}`);
        yield put({ type: "SET_SELECTED_PERSON", payload: selectedPersonResult });
        yield put({ type: "SET_TEST_STATUSES", payload: testStatusesResult });
    } catch (error) {
        console.error("ERROR fetching the selected person's information:", error);
    }
}

// add a new person to the system
function* addPerson(action) {
    try {
        // action.payload will be a person object
        yield axios.post("/api/person", action.payload);
        // User will add a new person on the main page, so need to refresh the list of people
        yield put({ type: "FETCH_PEOPLE" });
    } catch (error) {
        console.error("ERROR in addPerson generator:", error);
    }
}

function* personSaga() {
    yield takeLatest("FETCH_PEOPLE", fetchPeople);
    yield takeLatest("FETCH_SELECTED_PERSON_INFO", fetchSelectedPersonInfo);
    yield takeLatest("ADD_PERSON", addPerson);
}

export default personSaga;