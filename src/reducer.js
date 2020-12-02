import {combineReducers} from 'redux';

import todosReducer from './reducers/todos/todosSlice';
import filtersReducer from './reducers/filters/filtersSlice';

// export default function  rootReducer (state, action) {
//     return {
//         todos: todosReducer(state.todos, action),
//         filters: filtersReducer(state.filters, action)
//     }
// }

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
});

export default rootReducer;
