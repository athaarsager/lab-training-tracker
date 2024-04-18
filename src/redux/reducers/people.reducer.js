const peopleReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_PEOPLE":
            return action.payload;
        default:
            return state;
    }
}

export default peopleReducer;