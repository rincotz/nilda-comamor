import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import mealsReducer from '../reducers/meals'
import partnersReducer from '../reducers/partners'
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store Creation
export default () => {
    const store = createStore(
        combineReducers({
            partner: partnersReducer,
            meals: mealsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}
