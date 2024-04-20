import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// get all people
function* fetchPeople() {
    try {
        const peopleResponse = yield axios.get("/api/person");
        yield put({ type: "SET_PEOPLE", payload: peopleResponse.data});
    } catch (error) {
        console.error("ERROR in fetchPeople generator:", error);
    }
}

// get individual person's info for display. Including test info in this generator
function* fetchSelectedPersonInfo(action) {
    try {
        // action.payload will be the selected person's id
        const selectedPersonResponse = yield axios.get(`/api/person/${action.payload}`);
        const trainingStatusesResponse = yield axios.get(`/api/training/${action.payload}`);
        yield put({ type: "SET_SELECTED_PERSON", payload: selectedPersonResponse.data[0] });
        yield put({ type: "SET_TEST_STATUSES", payload: trainingStatusesResponse.data });
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
        console.error("ERROR adding a new person:", error);
    }
}

// update a person's info
function* updatePerson(action) {
    try {
        // action.payload will be a person object
        yield axios.put(`/api/person/${action.payload.id}`, action.payload);
        // User will update info on person details page, so need to refresh the selected person to reflect the changes made
        yield put({ type: "FETCH_SELECTED_PERSON_INFO", payload: action.payload.id });
    } catch (error) {
        console.error("ERROR updating person:", error);
    }
}

// Delete a person (mark them as having left the institution)
function* removePerson(action) {
    try {
        // action.payload will be the person's id
        yield axios.put(`/api/person/delete/${action.payload}`);
        // user will "delete" a person from the main page, so need to refresh the list of people
        yield put({ type: "FETCH_PEOPLE" });
    } catch (error) {
        console.error("ERROR removing person:", error);
    }
}

function* personSaga() {
    yield takeLatest("FETCH_PEOPLE", fetchPeople);
    yield takeLatest("FETCH_SELECTED_PERSON_INFO", fetchSelectedPersonInfo);
    yield takeLatest("ADD_PERSON", addPerson);
    yield takeLatest("UPDATE_PERSON", updatePerson);
    yield takeLatest("REMOVE_PERSON", removePerson);
}

export default personSaga;