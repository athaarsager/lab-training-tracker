const selectedTrainingReducer = (state = {}, action) => {
    switch(action.type) {
        case "SET_SELECTED_TRAINING":
            return action.payload;
        case "CLEAR_SELECTED_TRAINING":
            return state;
        default:
            return state;
    }
}

export default selectedTrainingReducer;