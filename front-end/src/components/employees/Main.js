import React, { Component } from "react";
import { Col, Container, Row, Button } from "reactstrap";
import EmployeeList from "./EmployeeList";
import AddEmployeeModal from "./AddEmployeeModal";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";
import API_URL from '../../constants/Index';
import { Redirect } from 'react-router-dom';

class Main extends Component {
  state = {
    employees: [],
    tasks: [],
    currentPage: 1,
    totalPages: 1
  };

  componentDidMount() {
    this.getEmployees(this.state.currentPage);
    this.getTasks(this.state.currentPage);
    this.resetState();
  }

  getEmployees = (page) => {
    var token = localStorage.getItem('token');
    if(token){
      axios.get(API_URL + `?page=${page}`, { headers: {Authorization: `JWT ${localStorage.getItem('token')}`} })
        .then(res => {
          this.setState({
            employees: res.data,
            totalPages: res.data.total_pages
          })
        });
    } else {
      return <Redirect to='http://localhost:8000/'/>
    }
  };

  resetState = () => {
    this.getEmployees(this.state.currentPage);
    this.getTasks(this.state.currentPage);
  };

  
  getTasks = (page) => {
    var token = localStorage.getItem('token');
    if(token){
      axios.get("http://localhost:8000/api/employees/tasks/", { headers: {Authorization: `JWT ${localStorage.getItem('token')}`} })
        .then(res => {
          this.setState({
            tasks: res.data,
            totalPages: res.data.total_pages
          })
        });
    } else {
      return <Redirect to='http://localhost:8000/'/>
    }
  };



  render() {
    const { employees, tasks, currentPage, totalPages } = this.state;
    return (
      <div className="Main">
        <div className="text-center">
          <h3 className="display-3 text-white bg-secondary">Employee List</h3>
        </div>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <EmployeeList
                employees={employees}
                resetState={this.resetState}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <AddEmployeeModal create={true} resetState={this.resetState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TaskList tasks={tasks} resetState={this.resetState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <AddTaskModal create={true} resetState={this.resetState} tasks={tasks} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Button onClick={this.handlePrevPage} disabled={currentPage === 1}>Previous</Button>
              <Button onClick={this.handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
