import db, { storage, auth, firebase } from '../firebase/firebase'
import {ADD_MEAL, EDIT_MEAL, REMOVE_MEAL, SET_MEALS} from "./constants";

// ADD_MEAL
export const addMeal = (meal) => ({
    type: ADD_MEAL,
    meal
})

export const startAddMeal = (mealData = {}) => {
    return (dispatch) => {
        const {
            name,
            description,
            price,
            available,
            location,
            chef,
            courrier,
            courrierStart,
            courrierEnd,
            pickUp,
            pickUpStart,
            pickUpEnd,
            table,
            tableStart,
            tableEnd,
            frozen,
            picture
        } = mealData
        const meal = {
            name,
            description,
            price,
            available,
            location,
            chef,
            courrier,
            courrierStart,
            courrierEnd,
            pickUp,
            pickUpStart,
            pickUpEnd,
            table,
            tableStart,
            tableEnd,
            frozen,
            picture
        }

        return db.collection('meals')
            .add(meal)
            .then((docRef) => {
                dispatch(addMeal({
                    id: docRef.id,
                    ...meal
                }))
            })
    }
}

export const getCooker = () => {
    auth.onAuthStateChanged(cooker => {
        return db.collection('users').doc(cooker.uid)
    })
}

export const addMealPic = (uid, blob, mealImage) => {
    const storageRef = firebase.storage().ref()
    storageRef.child(`meals/${uid}`).put(blob, { contentType: mealImage.type }).then(snapshot => {
        return snapshot.ref.getDownloadURL()
    })
}

// EDIT_MEAL
export const editMeal = (id, updates) => ({
    type: EDIT_MEAL,
    id,
    updates
})

export const startEditMeal = (id, updates) => {
    return (dispatch) => {
        return db.collection('meals').doc(id).update(updates)
            .then(() => {
                dispatch(editMeal(id, updates))
            })
    }
}

// REMOVE_MEAL
export const removeMeal = ({ id }) => ({
    type: REMOVE_MEAL,
    id
})

export const startRemoveMeal = ({ id }) => {
    return (dispatch) => {
        return db.collection('meals').doc(id).delete()
            .then(dispatch(removeMeal({ id })))
    }
}

// SET_MEALS
export const setMeals = (meals) => ({
    type: SET_MEALS,
    meals
})

export const startSetMeals = () => {
    return (dispatch) => {
        return db.collection('meals')
            .get()
            .then((querySnapshot) => {
                const meals = []
                querySnapshot.forEach((doc) => {
                    meals.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                dispatch(setMeals(meals))
            })
    }
}