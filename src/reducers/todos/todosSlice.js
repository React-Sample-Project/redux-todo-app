import { STATUS_FILTERS } from '../../constants';
import { client } from "../../api/client";

const initialState =  [];

export const selectTodoIds = (state)=>{
    let todos = state.todos;
    let {status, colors} = state.filters;
    let filteredTodos = todos.filter((todo)=>{
        if(status === STATUS_FILTERS.All || (status === STATUS_FILTERS.Active && !todo.completed) || (status === STATUS_FILTERS.Completed && todo.completed)){
            if(!colors.length || (todo.color && colors.includes(todo.color))){
                return true;
            }
        }
    });
    return filteredTodos.map((todo)=>todo.id);
}

export async function fetchTodos(dispatch, getState){
    const response = await client.get('/fakeApi/todos');
    dispatch({
        type:'todos/todosLoaded',
        payload: response.todos
    });
}

export function addTodo(text){
    return async function addTodo(dispatch, getState){
        const response = await client.post('/fakeApi/todos',{
            todo: {text}
        });
        dispatch({
            type: 'todos/todoAdded',
            payload: response.todo
        })
    }
}

// function nextId(todos) {
//     const maxId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1);
//     return maxId + 1;
// }

export default function todosReducer(state = initialState, action){
    switch(action.type){
        case 'todos/todosLoaded':{
            return action.payload;
        }
        case 'todos/todoAdded':{
            return [
                ...state,
                action.payload
                // {
                //     id: nextId(state),
                //     completed: false,
                //     text: action.payload
                // }
            ]
        }
        case 'todos/toggleCompleted':{
            let todos = state.map((todoData) => {
                if(todoData.id === action.payload){
                    todoData = {
                        ...todoData,
                        completed: !todoData.completed
                    }
                } 
                return todoData;
            });
            return todos;
        }
        case 'todos/allCompleted':{
            let todos = state.map((todoData) => {
                if(!todoData.completed){
                    todoData = {
                        ...todoData,
                        completed: true
                    }
                }
                return todoData;
            });
            return todos;
        }
        case 'todos/deleteCompleted':{
            let todos = state.filter((todoData) => !todoData.completed);
            return [...todos];
        }
        case 'todos/deleteTodo': {
            let todos = state.filter((todoData) => todoData.id !== action.payload);
            return [...todos]
        }
        case 'todos/colorUpdated':{
            let todos = state.map((todoData) => {
                if(todoData.id === action.payload.id){
                    todoData = {
                        ...todoData,
                        color: action.payload.color
                    }
                } 
                return todoData;
            });
            return todos;
        }
        default:
            return state;
    }
}