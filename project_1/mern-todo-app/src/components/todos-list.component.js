import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <button onClick={ () =>
            axios.delete('http://localhost:4000/todos/'+props.todo._id)
                .then(() => {
                        console.log("Deleted: " + props.todo._id);
                        props.fetchTodos();
                    })                    
                .catch(err => console.log(err))
        }
        >x</button>
    </tr>
    
)
export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        this.interval = setInterval(() => 
            axios.get('http://localhost:4000/todos/')
                .then(res => {
                    this.setState({ todos: res.data });
                })
                .catch(function(err){
                    console.log(err);
                }), 2000);
        
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} fetchTodos={this.fetchTodos}  key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}