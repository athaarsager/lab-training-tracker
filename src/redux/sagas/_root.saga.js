import { all } from "redux-saga/effects";
import personSaga from "./person.saga";
import trainingSaga from "./training.saga";

export default function* rootSaga() {
    yield all([
        personSaga(),
        trainingSaga()
    ]);
}