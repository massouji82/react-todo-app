import React, { Component } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, todo: this.props.todo };
    this.handleClick = this.handleClick.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTodoCompletion = this.handleTodoCompletion.bind(this);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleEdit(evt) {
    evt.preventDefault();
    this.props.editTodo(this.props.id, this.state.todo);
    this.setState({
      isEditing: false,
    });
  }

  handleClick() {
    this.props.removeTodo(this.props.id);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleTodoCompletion(evt) {
    this.props.todoCompletion(this.props.id);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <CSSTransition key="editing" timeout={500} classNames="form">
          <form className="Todo-edit-form" onSubmit={this.handleEdit}>
            <input
              type="text"
              value={this.state.todo}
              onChange={this.handleChange}
              name="todo"
            />
            <button>Save</button>
          </form>
        </CSSTransition>
      );
    } else {
      result = (
        <CSSTransition key="normal" timeout={500} classNames="task-text">
          <li className="Todo-task" onClick={this.handleTodoCompletion}>
            {this.props.todo}
          </li>
        </CSSTransition>
      );
    }
    return (
      <TransitionGroup
        className={this.props.completed ? "Todo completed" : "Todo"}
      >
        {result}
        <div className="Todo-buttons">
          <button onClick={this.toggleForm}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={this.handleClick}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </TransitionGroup>
    );
  }
}

export default Todo;
