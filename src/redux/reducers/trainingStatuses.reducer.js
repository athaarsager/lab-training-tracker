const trainingStatusesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TEST_STATUSES":
            return action.payload;
        case "CLEAR_TEST_STATUSES":
            return state;
        default:
            return state;
    }
}

export default trainingStatusesReducer;