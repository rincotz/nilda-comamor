import db, { firebase, auth } from  '../firebase/firebase'
import {addPartner, removePartner} from './partners'

export const startLogin = (login, password) => {
    return (dispatch) => {
        return auth.signInWithEmailAndPassword(login, password).catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
        }).then((user) => {
            return db.collection('partners').doc(user.user.uid).get().then((doc) => {
                dispatch(addPartner(doc.data()))
            }).catch((error) => {
                console.log('Error getting document: ', error)
            })
        })
    }
}

export const startLogout = () => {
    return (dispatch) => {
        return auth.signOut().catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
        }).then(() => {
            dispatch(addPartner({}))
        })
    }
}

export const isLoggedIn = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            return user.uid
        } else {
            return false
        }
    })
}