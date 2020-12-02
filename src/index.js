import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

console.log(store.getState());

let unsubscribe = store.subscribe(function(){
    console.log('Current state', store.getState());
});


store.dispatch({
    type:'todos/todoAdded',
    payload: 'Learn todo actions'
});

store.dispatch({
    type:'todos/todoAdded',
    payload: 'Learn event loop'
});

unsubscribe();

store.dispatch({
    type:'todos/todoAdded',
    payload: 'Learn Browser operation'
});


