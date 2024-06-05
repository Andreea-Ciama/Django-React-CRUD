import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Main from './components/employees/Main';
import LoginForm from './components/accounts/Login';
import Signup from './components/accounts/Signup';
import Nav from './components/accounts/Nav';
import NetworkStatusIndicator from './components/employees/NetworkStatusIndicator';
import { isReachable } from './components/employees/ServerReachable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: false,
      username: '',
      isBackendReachable: true,
    };
  }

  componentDidMount() {
    this.checkBackendStatus();
    if (localStorage.getItem('token')) {
      axios.get('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        this.setState({ logged_in: true, username: res.data.username });
      });
    }
  }

  checkBackendStatus = async () => {
    try {
      const isBackendReachable = await isReachable();
      this.setState({ isBackendReachable });
    } catch (error) {
      console.error('Error checking backend server status:', error);
      this.setState({ isBackendReachable: false });
    }
  };

  handle_login = (e, data) => {
    e.preventDefault();
    axios.post('http://localhost:8000/token-auth/', data)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      this.setState({ logged_in: true, username: res.data.user.username });
    })
    .catch(err => {
      console.error('Login failed:', err);
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register/', data)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      this.setState({ logged_in: true, username: res.data.username });
    })
    .catch(err => {
      console.error('Signup failed:', err);
    });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({ displayed_form: form });
  };

  set_user = (username) => {
    this.setState({ logged_in: true, username });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} set_user={this.set_user} />;
        break;
      default:
        form = null;
    }

    return (
      <Router>
        <div className="App">
          <NetworkStatusIndicator />
          <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          <Switch>
            <Route path="/main" component={Main} />
            <Route path="/signup" render={(props) => <Signup {...props} set_user={this.set_user} />} />
            <Route path="/" render={() => this.state.logged_in ? <Main /> : form} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
