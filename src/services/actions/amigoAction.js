import db from '../ConnectFirebase'
import * as AmigosAction from './amigosAction'

const colletion = "amigos"

export const SET_AMIGO_DATA = "SET_AMIGO_DATA"
export const CLEAR_AMIGO_DATA = "CLEAR_AMIGO_DATA"


export const get = (id) => async (dispatch, getState) => {
    try {
        let dados = await db.collection(colletion).doc(id).get()
        let objeto = Object.assign({}, dados.data(), { id: dados.id })
        return dispatch({
            type: SET_AMIGO_DATA,
            payload: objeto
        })
    } catch (error) {
        console.log(error)
    }
}

export const clear = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_AMIGO_DATA,
    })
}

export const save = (param) => async (dispatch, getState) => {
    try {
        let id = param.id
        delete param.id
        if (id) {
            await db.collection(colletion).doc(id).update(param)
        } else {
            await db.collection(colletion).add(param)
        }
        return dispatch(AmigosAction.getList())
    } catch (error) {
        console.log(error)
    }
}

export const remove = (id) => async (dispatch, getState) => {
    try {
        await db.collection(colletion).doc(id).delete()
        return dispatch(AmigosAction.getList())
    } catch (error) {
        console.log(error)
    }
}
