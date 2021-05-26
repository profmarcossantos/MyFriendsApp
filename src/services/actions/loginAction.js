import firebase from 'firebase'
import { AsyncStorage } from "react-native"

export const SET_LOGIN_DATA = "SET_LOGIN_DATA"
export const CLEAR_LOGIN_DATA = "CLEAR_LOGIN_DATA"

export const login = (email, senha, lembreme) => async (dispatch, getState) => {
    try {

        if (!lembreme) {
            AsyncStorage.removeItem("email")
            AsyncStorage.removeItem("senha")
        }
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        console.log("passou do login")
        if (lembreme) {
            AsyncStorage.setItem("email", email)
            AsyncStorage.setItem("senha", senha)
        }
        let usuario = {
            email
        }
        return dispatch({
            type: SET_LOGIN_DATA,
            payload: usuario
        })
    }
    catch (error) {
        console.log(error)
    }

}


export const logoff = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_LOGIN_DATA,
    })
}


export const saveNewUsers = (email, senha) => async (dispatch, getState) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
    } catch (error) {
        console.log(error)
    }
}
