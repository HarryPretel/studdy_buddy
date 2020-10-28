import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MessageForm from './components/MessageForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      messaging: true,
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    console.log('handle_login')
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        console.log('json in login: ' + JSON.stringify(json))
        if (json.user) {
          localStorage.setItem('username', json.user.username)
          localStorage.setItem('userpk', json.user.pk)
        }
        else throw Error("no user exists")
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user ? json.user.username : ''
        });
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert("Wrong username or password");
      });
  };

  handle_signup = (e, data) => {
    console.log('handle_signup')
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.username[0] === "A user with that username already exists.") throw Error("a user with that username already exists");
        console.log('here it is' + JSON.stringify(json))
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      });
  };

  handle_logout = () => {
    console.log('handle_logout')
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'message':
        form = <MessageForm />;
        break;
      default:
        form = null;
    }

    let messaging = this.state.messaging ? <MessageForm /> : null

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
         />
         
         <h3>
           {this.state.logged_in
             ? `Hello, ${this.state.username}`
             : 'Please Log In'}
         </h3>
         {form}
         {messaging}
      </div>

    );
  }
}

export default App;
