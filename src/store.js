import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import { sayHiOnDispatch, includeMeaningOfLife } from "./exampleAddons/enhancers";
import {print1, print2, print3} from "./exampleAddons/middleware";



let preloadedState;
const persistedTodosString = localStorage.getItem('todos');
if(persistedTodosString){
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

let composedEnhancer =  composeWithDevTools(applyMiddleware(thunkMiddleware)/* sayHiOnDispatch, includeMeaningOfLife, applyMiddleware(print1, print2, print3) */);
let store = createStore(rootReducer, preloadedState, composedEnhancer);
export default store;