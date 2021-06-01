import db from '../ConnectFirebase'
import * as AmigosAction from './amigosAction'
import * as Location from "expo-location"

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
        throw error.message
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

        let coordenadas = await Location.geocodeAsync(param.endereco)
        //Location.geocodeAsync -> devolve um array de coordenadas
        if (coordenadas.length>0){
            param.latitude = coordenadas[0].latitude
            param.longitude = coordenadas[0].longitude
        }

        if (id) {
            await db.collection(colletion).doc(id).update(param)
        } else {
            await db.collection(colletion).add(param)
        }
        return dispatch(AmigosAction.getList())
    } catch (error) {
        throw error.message
    }
}

export const remove = (id) => async (dispatch, getState) => {
    try {
        await db.collection(colletion).doc(id).delete()
        return dispatch(AmigosAction.getList())
    } catch (error) {
        throw error.message
    }
}
