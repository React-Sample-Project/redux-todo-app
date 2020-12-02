import React from 'react';
import InputBox from "../../components/input-box/input-box.component";
import { useDispatch } from "react-redux";
import { addTodo } from "../../reducers/todos/todosSlice";

export default function Header() {
    const dispatch = useDispatch();
    let onSubmit = (value) =>{
        value = value.trim();
        //async dispatch using thunk
        dispatch(addTodo(value));
    }
    return (
        <header className="header">
            <InputBox className="new-todo" placeholder="What needs to be done?" onSubmit={onSubmit}/>
        </header>
    )
}
