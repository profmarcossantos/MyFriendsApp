import { AsyncStorage } from "react-native"
import firebase from 'firebase'

export const login = (email, senha, lembreme) => {

    return new Promise((resolve, reject) => {
        if (!lembreme) {
            AsyncStorage.removeItem("email")
            AsyncStorage.removeItem("senha")
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => {
                if (lembreme) {
                    AsyncStorage.setItem("email", email)
                    AsyncStorage.setItem("senha", senha)
                }
                resolve()
            })
            .catch((erro) => {
                reject(erro.message)
            })
    })
}