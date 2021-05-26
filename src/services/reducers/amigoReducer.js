import * as Actions from '../actions'

const initialState = {}

const amigo = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_AMIGO_DATA:
            {
                return {
                    ...action.payload
                }
            }
        case Actions.CLEAR_AMIGO_DATA:
            {
                return {}
            }
        default:
            {
                return state
            }
    }
}

export default amigo;