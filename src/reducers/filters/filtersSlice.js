
import { STATUS_FILTERS } from "../../constants";

const initialState = {
    status: STATUS_FILTERS.All,
    colors: []
}

export default function filtersReducer(state = initialState, action){
    switch(action.type){
        case 'todos/statusFilterChanged':{
            return {
                ...state,
                status: action.payload
            }
        }
        case 'todos/colorFilterChanged':{
            return {
                ...state,
                colors: action.payload
            }
        }
        case 'todos/colorFilterChanged/Added':{
            let colors = [...state.colors, action.payload];
            return {
                ...state,
                colors
            }
        }
        case 'todos/colorFilterChanged/Removed':{
            let colors = state.colors.filter((color) => color === !action.payload);
            return {
                ...state,
                colors
            }
        }
        default:
            return state;
    }
}   