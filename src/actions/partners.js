import db from '../firebase/firebase'
import { ADD_PARTNER, EDIT_PARTNER, REMOVE_PARTNER } from "./constants";

// ADD_PARTNER
export const addPartner = (partner) => ({
    type: ADD_PARTNER,
    partner
})

export const startAddPartner = (partnerData = {}) => {
    return (dispatch) => {
        const {
            uid,
            id,
            name,
            gender,
            birth,
            email,
            phone,
            bio,
            nationality,
            addressLine1,
            addressLine2 = '',
            number,
            neighborhood,
            zip,
            picture,
            geoPoint,
            guestRatings = '',
            cookerRatings = '',
            ratings = ''
        } = partnerData
        const partner = {
            uid,
            id,
            name,
            gender,
            birth,
            email,
            phone,
            bio,
            nationality,
            addressLine1,
            addressLine2,
            number,
            neighborhood,
            zip,
            picture,
            geoPoint,
            guestRatings,
            cookerRatings,
            ratings
        }
        return db.collection('partners')
            .doc(partner.uid)
            .set(partner)
            .then((docref) => {
                console.log(`Sucessfully added partner ${partner.uid}`)
        })
    }
}

//EDIT_PARTNER
export const editPartner = (uid, updates) => ({
    type: EDIT_PARTNER,
    uid,
    updates
})

export const startEditPartner = (uid, updates) => {
    return (dispatch) => {
        return db.collection('partners').doc(uid).update(updates)
            .then(() => {
                dispatch(editPartner(uid, updates))
            })
    }
}

//REMOVE_PARTNER
export const removePartner = ({ uid }) => ({
    type: REMOVE_PARTNER,
    uid
})

export const startRemovePartner = ({ uid }) => {
    return (dispatch) => {
        return db.collection('partners').doc(uid).delete()
            .then(dispatch(removePartner({ uid })))
    }
}

//SET_PARTNER
export const startSetPartner = (partnerUID) => {
    return (dispatch) => {
        return db.collection('partners').doc(partnerUID)
            .get()
            .then((partner) => {
                dispatch(addPartner(partner.data()))
            })
    }
}