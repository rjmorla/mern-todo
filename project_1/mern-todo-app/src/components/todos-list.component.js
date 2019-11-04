import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td>
        {/* this is where the delete happens */}
        <button onClick={ () =>
            axios.delete('http://localhost:4000/todos/'+props.todo._id)
                .then(() => props.deleteItem(props.todo._id))                    
                .catch(err => console.log(err))
        }
        >Delete</button>
        </td>   
    </tr>
    
)
export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};

    }

    deleteItemHandler = (id) => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({todos: updatedTodos})
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
           return <Todo todo={currentTodo} deleteItem={this.deleteItemHandler} key={i} />;
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