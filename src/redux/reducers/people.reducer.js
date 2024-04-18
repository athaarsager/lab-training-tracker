const peopleReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_PEOPLE":
            return state;
        default:
            return state;
    }
}

export default peopleReducer;