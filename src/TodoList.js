import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.removeTodo = this.removeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.todoCompletion = this.todoCompletion.bind(this);
  }

  addTodo(Newtodo) {
    //Add todo to list of todos
    this.setState({
      todos: [...this.state.todos, Newtodo],
    });
  }

  removeTodo(id) {
    //Delete todo that was clicked
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  editTodo(id, editedTask) {
    //Edit todo
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: editedTask };
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  todoCompletion(id) {
    //line-through completed todo
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  render() {
    const todoList = this.state.todos.map((todos) => {
      return (
        <CSSTransition key={todos.id} timeout={500} classNames="todo">
          <Todo
            removeTodo={this.removeTodo}
            todo={todos.todo}
            id={todos.id}
            editTodo={this.editTodo}
            completed={todos.completed}
            todoCompletion={this.todoCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App</span>
        </h1>
        <TransitionGroup className="todo-list">{todoList}</TransitionGroup>
        <NewTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}

export default TodoList;
