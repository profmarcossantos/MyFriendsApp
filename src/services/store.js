import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import amigo from './reducers/amigoReducer'
import amigos from './reducers/amigosReducer'
import login from './reducers/loginReducer'
const rootReducer = combineReducers({
    amigo, amigos, login
})

//Desenvolvimento
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


//Produção
//const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
