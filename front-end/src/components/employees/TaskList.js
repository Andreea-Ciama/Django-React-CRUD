import React, { Component } from "react";
import { Table } from "reactstrap";
import AddTaskModal from "./AddTaskModal";
import RemovalModal from "./RemovalModal";

class TaskList extends Component {
  render() {
    const tasks = this.props.tasks;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Employee ID</th> {/* Added Employee ID column */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!tasks || tasks.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No tasks available</b>
              </td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.status}</td>
                <td>{task.employeeID}</td> {/* Display Employee ID */}
                <td align="center">
                  <AddTaskModal
                    create={false}
                    task={task}
                    resetState={this.props.resetState}
                  />
                  &nbsp;
                  &nbsp;
                  <RemovalModal
                    id={task.id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default TaskList;
