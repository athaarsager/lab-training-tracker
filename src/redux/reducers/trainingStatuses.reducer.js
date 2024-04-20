const trainingStatusesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TRAINING_STATUSES":
            return action.payload;
        case "CLEAR_TRAINING_STATUSES":
            return state;
        default:
            return state;
    }
}

export default trainingStatusesReducer;