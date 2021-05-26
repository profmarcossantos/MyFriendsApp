import * as Actions from '../actions'

const initialState = []

const amigos = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_AMIGOS_DATA:
            {
                return [
                    ...initialState,
                    ...action.payload
                ]
            }
        default:
            {
                return state
            }

    }
}
export default amigos;