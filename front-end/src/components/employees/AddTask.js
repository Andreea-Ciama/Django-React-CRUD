import React, { Component } from 'react';
import axios from "axios";
import API_URL from '../../constants/Index';

class AddTask extends Component {
  state = {
    id: 0,
    title: "",
    description: "",
    due_date: "",
    status: "PENDING",
    employeeID: "",
    employeeIDs: [], // Store the list of employee IDs
    errors: {} // Object to store validation errors
  };

  async componentDidMount() {
    if (this.props.task) {
      const { id, title, description, due_date, status, employeeID } = this.props.task;
      this.setState({ id, title, description, due_date, status, employeeID });
    }

    // Fetch employee IDs
    try {
      const response = await axios.get(API_URL + "employee-ids/", {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
      });
      this.setState({ employeeIDs: response.data });
    } catch (error) {
      console.error('Error fetching employee IDs:', error);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Validation function
  validateTask = () => {
    const { title, description } = this.state;
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required.";
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
    }

    return errors;
  };

  addTask = async (e) => {
    e.preventDefault();

    // Validate before submitting
    const errors = this.validateTask();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    try {
      await axios.post(API_URL + "tasks/", this.state, {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
      });
      this.props.resetState();
      this.props.toggle();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  editTask = async (e) => {
    e.preventDefault();

    // Validate before submitting
    const errors = this.validateTask();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    try {
      await axios.put(API_URL + `tasks/${this.state.id}/`, this.state, {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
      });
      this.props.resetState();
      this.props.toggle();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    const { errors, employeeIDs } = this.state;
    const btnName = this.props.task ? "Update" : "Add";
    return (
      <form onSubmit={this.props.task ? this.editTask : this.addTask} className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
            required
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due date:</label>
          <input
            className="form-control"
            type="date"
            name="due_date"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.due_date)}
            required
          />
          <div className="valid-feedback">Looks good! </div>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-control"
            name="status"
            value={this.defaultIfEmpty(this.state.status)}
            onChange={this.onChange}
            required
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employeeID">Employee ID:</label>
          <select
            className="form-control"
            name="employeeID"
            value={this.defaultIfEmpty(this.state.employeeID)}
            onChange={this.onChange}
            required
          >
            <option value="">Select an Employee</option>
            {employeeIDs.map((eid) => (
              <option key={eid} value={eid}>{eid}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary float-right">{btnName}</button>
      </form>
    );
  }
}

export default AddTask;
