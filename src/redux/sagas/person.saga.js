import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchPeople() {
    try {
        const people = yield axios.get("/api/person");
        yield put({ type: "SET_PEOPLE", payload: people});
    } catch (error) {
        console.error("ERROR in fetchPeople generator:", error);
    }
}

function* personSaga() {
    yield takeLatest("FETCH_PEOPLE", fetchPeople);
}

export default personSaga;