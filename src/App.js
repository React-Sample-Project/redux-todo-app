import React from 'react';
import Header from "./sections/header/header.section";
import Footer from "./sections/footer/footer.section";
import TodoList from './components/todo-list/todo-list.component';
import store from './store';
import {Provider} from 'react-redux';
function App() {
  return (
    <div className="App">
        <nav>
            <section>
                <h1>Redux Fundamentals Example</h1>
            </section>
        </nav>
        <main>
            <section className="medium-container">
                <h2>Todos</h2>
                <div className="todoapp">
                    <Provider store={store}>
                        <Header/>
                        <TodoList/>
                        <Footer/>
                    </Provider>
                </div>
            </section>
        </main>
    </div>
  )
}

export default App
