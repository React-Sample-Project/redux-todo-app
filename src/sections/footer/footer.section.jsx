import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {availableColors, capitalize} from '../../reducers/filters/colors';
import { StatusFilters } from '../../reducers/filters/filtersSlice';


const Actions = ()=>{
    let dispatch = useDispatch();
    let markAllCompleted = ()=>{
        dispatch({
            type:'todos/allCompleted'
        });
    }

    let clearCompleted = ()=>{
        dispatch({
            type: 'todos/deleteCompleted'
        });
    }
    return (
        <div className="actions">
            <h5>
                Actions
            </h5>
            <button className="button" onClick={markAllCompleted}>Mark All Completed</button>
            <button className="button" onClick={clearCompleted}>Clear Completed</button>
        </div>
    );
}

const TodoCount = ({count})=>{
    return (
        <div className="todo-count">
            <h5> Remaining Todos </h5>
            <strong>{count}</strong> item{count>1? "s":""} Left
        </div>
    )  
}

const StatusFilter = ()=>{
    let dispatch = useDispatch();
    let currentStatusFilter = useSelector(state => state.filters.status);
    let handleStatusSelection = (e, statusFilter)=>{
        dispatch({
            type: 'todos/statusFilterChanged',
            payload: statusFilter
        });
    }   
    return (
        <div className="filters statusFilters">
            <h5>Filter by  Status</h5>
            <ul>
                {
                    Object.keys(StatusFilters).map((filterKey)=>{
                        let filterName = StatusFilters[filterKey];
                        return (
                            <li key={filterKey}>
                                <button onClick={(e)=>handleStatusSelection(e, filterName)} className={(filterName === currentStatusFilter) ? "selected":""}>{capitalize(filterName)}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

const ColorFilters = ()=>{
    let dispatch = useDispatch();
    let colors = useSelector(state => state.filters.colors);
    let onSelectionChange = (e)=>{
        let checked = e.target.checked;
        dispatch({
            type:checked? 'todos/colorFilterChanged/Added':'todos/colorFilterChanged/Removed',
            payload: e.target.name
        })
    }
    return (
        <div className="filters colorFilters">
            <h5> Filter by Status </h5>
            <form className="colorSelection">
                {availableColors.map((color)=>{
                    return (
                        <label key={color}>
                            <input type="checkbox" checked={colors.includes(color)}  name={color} onChange={onSelectionChange}/>
                            <span className="color-block" style={{
                                backgroundColor: color
                              }}></span>
                              {capitalize(color)}
                        </label>
                    )
                })}
            </form>
        </div>
    );
}

export default function Footer() {
    let todos = useSelector(state => state.todos);
    let count = todos.filter((todo)=> !todo.completed).length;
    return (
        <footer className="footer">
            <Actions/>
            <TodoCount count={count}/>
            <ColorFilters/>
            <StatusFilter/>
        </footer>
    )
}
