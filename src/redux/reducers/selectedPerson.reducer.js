const selectedPersonReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PERSON":
            return action.payload;
        case "CLEAR_SELECTED_PERSON":
            return state;
        default:
            return state;
    }
}

export default selectedPersonReducer;