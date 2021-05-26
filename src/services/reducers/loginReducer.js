import * as Actions from '../actions'
const initialState = {}
const login = function (state = initialState, action) {

    switch (action.type) {
        case Actions.SET_LOGIN_DATA:
            {
                return {
                    ...action.payload
                }
            }
        case Actions.CLEAR_LOGIN_DATA:
            {
                return {}
            }
        default:
            {
                return state
            }
    }
}

export default login;