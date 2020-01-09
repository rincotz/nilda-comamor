import {ADD_MEAL, EDIT_MEAL, REMOVE_MEAL, SET_MEALS} from "../actions/constants";

// Meals Reducer
export const mealDefaultState = {
    id: "",
    available: "",
    chef: {
        uid: "",
        id: "",
        name: "",
        gender: "",
        birth: "",
        email: "",
        phone: "",
        bio: "",
        nationality: "",
        addressLine1: "",
        addressLine2: "",
        number: "",
        neighborhood: "",
        zip: "",
        picture: "",
        geoPoint: "",
        guestRatings: "",
        cookerRatings: "",
        ratings: ""
    },
    courrier: "",
    courrierEnd: "",
    courrierStart: "",
    description: "",
    frozen: "",
    name: "",
    pickUp: "",
    pickUpEnd: "",
    pickUpStart: "",
    picture: "",
    price: "",
    table: "",
    tableEnd: "",
    tableStart: ""
}
const mealsReducerDefaultState = []
export default (state = mealsReducerDefaultState, action) => {
    switch (action.type) {
        case ADD_MEAL:
            return [...state, action.meal]
        case REMOVE_MEAL:
            return state.filter(({ id }) => (
                id !== action.id
            ))
        case EDIT_MEAL:
            return state.map((meal) => {
                if (meal.id === action.id) {
                    return {
                        ...meal,
                        ...action.updates
                    }
                } else {
                    return meal
                }
            })
        case SET_MEALS:
            return action.meals
        default:
            return state
    }
}