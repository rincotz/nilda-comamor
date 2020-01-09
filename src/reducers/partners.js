import {ADD_PARTNER, EDIT_PARTNER, REMOVE_PARTNER } from "../actions/constants"

// Partner reducer
export const partnerReducerDefaultState = {
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
}
export default (state = partnerReducerDefaultState, action) => {
    switch (action.type) {
        case ADD_PARTNER:
            return action.partner
        case REMOVE_PARTNER:
            return partnerReducerDefaultState
        case EDIT_PARTNER:
            return {
                ...partner,
                ...action.updates
            }
        default:
            return state
    }
}