import db from '../ConnectFirebase'
const colletion = "amigos"
export const SET_AMIGOS_DATA = 'SET_AMIGOS_DATA'

export const getList = () => async (dispatch, getState) => {
    try {
        let dados = await db.collection(colletion).get()
        let lista = []
        dados.forEach(item => {
            let objeto = Object.assign({}, item.data(), { id: item.id })
            lista.push(objeto)
        })
        return dispatch({
            type: SET_AMIGOS_DATA,
            payload: lista
        })
    } catch (error) {
        throw error.message
    }


}
