import React, {useEffect} from 'react';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import TodoItem from "../todo-item/todo-item.component";
import {fetchTodos, selectTodoIds} from "../../reducers/todos/todosSlice";

// const selectTodoIds = state => state.todos.map(todo => todo.id);
// const selectTodos = state => state.todos;

export default function TodoList() {
    let dispatch = useDispatch();
    useEffect(() => {
        console.log("fetching todos");
        dispatch(fetchTodos);
    },[])
    let todoIds = useSelector(selectTodoIds, shallowEqual);
    // let todos = useSelector(selectTodos);
    return (
        <ul className="todo-list">
            {
                // todos.map(({id})=> <TodoItem key={id} id={id}/>)
                todoIds.map((todoId)=> <TodoItem key={todoId} id={todoId}/>)
            }
        </ul>
    )
}
