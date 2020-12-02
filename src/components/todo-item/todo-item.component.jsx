import React, {useState} from 'react';
import { ReactComponent as CancelSVG } from './cancel.svg';
import { useDispatch, useSelector } from 'react-redux';
import { availableColors, capitalize } from "../../reducers/filters/colors";

export default function TodoItem({id}) {
    let {text, completed, color} = useSelector(state => state.todos.find((todo) => todo.id === id));
    let dispatch = useDispatch();
    let handleCompletedChange = function(event){
        //dispatch completed state change
        dispatch({
            type:'todos/toggleCompleted',
            payload: id
        });
    }
    let handleColorChange = function(color){
        //dispatch color change
    }
    let handleDeleteButtonClick = ()=>{
        dispatch({
            type: 'todos/deleteTodo',
            payload: id
        })
    }
    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input checked={completed} className="toggle" type="checkbox" onChange={handleCompletedChange}/>
                    <div className="todo-text">
                        {text}
                    </div>
                </div>
                <div className="segment buttons">
                    <ColorSelector handleChange={handleColorChange} todoId={id} value={color}/>
                    <button className="destroy" onClick={handleDeleteButtonClick}>
                        <CancelSVG />
                    </button>
                </div>
            </div>
        </li>
    )
}

const ColorSelector = ({value, todoId}) =>{
    let dispatch = useDispatch();
    let handleChange = (event)=>{
        dispatch({
            type: 'todos/colorUpdated',
            payload: {
                color: event.target.value,
                id: todoId
            }
        });
    }
    return (
        <select value={value}  className="colorPicker" onChange={handleChange}>
            <option></option>
            {availableColors.map((color)=>{
                return <option key={color} value={color}>{capitalize(color)}</option>
            })}
        </select>
    )
}