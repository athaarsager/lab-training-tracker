const trainingsReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_TRAININGS":
            return action.payload;
        default:
            return state;
    }
}

export default trainingsReducer;