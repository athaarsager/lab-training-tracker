import { all } from "redux-saga/effects";
import personSaga from "./person.saga";

export default function* rootSaga() {
    yield all([
        personSaga(),
    ]);
}