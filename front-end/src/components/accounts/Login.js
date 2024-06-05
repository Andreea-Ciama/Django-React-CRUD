import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    has_err : false
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

  render() {
    return (
      <div className="Login container col-lg-6 col-md-6">
        <h2 className="display-3 text-center">XYZ-Company</h2>
        <h4 className="text-center display-4">Login</h4>
        <form onSubmit={e => this.props.handle_login(e, this.state)}>
          {this.state.has_err && <div className="error text-center font-weight-bold text-danger">Invalid Username/Password</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              placeholder="Enter Username"
              required
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
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn-custom">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};

export default LoginForm;
