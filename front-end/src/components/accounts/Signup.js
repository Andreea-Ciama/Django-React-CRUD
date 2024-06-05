import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_signup = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      this.props.set_user(response.data.username);
      this.props.history.push('/main'); // Redirecționează la pagina principală
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  render() {
    return (
      <div className="Signup container col-lg-6 col-md-6">
        <h4 className="text-center display-4">Sign up</h4>
        <form onSubmit={this.handle_signup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handle_change}
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn-custom">Submit</button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  handle_signup: PropTypes.func.isRequired,
  set_user: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Signup);
