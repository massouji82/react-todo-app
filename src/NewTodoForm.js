import React, { Component } from "react";
import uuid from "react-uuid";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const todos = { ...this.state, id: uuid(), completed: false };
    evt.preventDefault();
    this.props.addTodo(todos);
    this.setState({
      todo: "",
    });
  }

  handleChange(evt) {
    this.setState({
      todo: evt.target.value,
    });
  }

  render() {
    return (
      <div>
        <form
          className="NewTodoForm"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <div>
            <label htmlFor="todo"></label>
            <input
              placeholder="New Todo"
              type="text"
              id="todo"
              value={this.state.todo}
              onChange={this.handleChange}
              required
            />
          </div>
          <button>ADD TODO</button>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
