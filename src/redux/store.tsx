import { applyMiddleware, combineReducers, createStore } from 'redux';
import { foodsReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';


const rootReducer = combineReducers({
  foods: foodsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>