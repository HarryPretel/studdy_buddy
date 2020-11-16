import React, { Component } from 'react';
import Navi from './components/Nav';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import MessageForm from './components/MessageForm';
import Dashboard from './components/Dashboard';
import Course from './components/Course';
import SearchCourse from './components/Search';

import './App.css';
import { Search } from 'semantic-ui-react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: 'login',
      logged_in: false,//localStorage.getItem('token') ? true : false,
      username: '',
      messaging: false,
      pk: 0,
      token: '',
      first: '',
      search: '',
      results: [],
      course: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount')
    if (this.state.logged_in) {
      var json = fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
      json = Promise.resolve(json)
      console.log('here')
      console.log(localStorage.getItem('token'))
      console.log(this.state)
      this.setState({ username: json.username });
    }

    // if (this.state.logged_in) {
    //   fetch('http://localhost:8000/api/userprofiles/', {
    //     headers: {
    //       Authorization: `JWT ${localStorage.getItem('token')}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(json => {
    //       console.log('state when mounting: ' + JSON.stringify(this.state) + '\njson: ' + JSON.stringify(json))
    //       for (var i = 0; i < json.length; i++) {
    //         if (json[i].username === this.state.username) {
    //           this.setState({ pk: json[i].pk });
    //         }
    //       }
    //     });
    // }
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
          pk: json.user.pk,
          logged_in: true,
          displayed_form: '',
          username: json.user ? json.user.username : '',
          first: json.user.first_name
        });
        console.log(this.state.first)
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert("Wrong username or password");
      });
  };

  handle_signup = (e, data) => {
    console.log('handle_signup')
    console.log(data)
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.user)
    })
      .then(res => res.json())
      .then(json => {
        if (json.username[0] === "A user with that username already exists.") throw Error("a user with that username already exists");
        console.log('here it is' + JSON.stringify(json))
        console.log(json)
        localStorage.setItem('token', json.token)
        localStorage.setItem('userpk', json.pk)
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
          pk: json.pk,
          token: json.token
        });
        console.log(this.state)
        this.handle_create_profile(e, data)
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      });

  };

  handle_create_profile = (e, data) => {
    e.preventDefault();
    console.log(JSON.stringify(data.profile))
    console.log('create profile here')
    fetch('http://localhost:8000/api/userprofiles/' + this.state.pk + '/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token
      },
      body: JSON.stringify(data.profile)
    })
      .then(response => response.json())
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      })

    this.render()
  }

  handle_logout = () => {
    console.log('handle_logout')
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '', displayed_form: 'login' });
  };

  handle_search_value = (e) => {
    this.setState({
      search: e.target.value
    })
  };

  handle_course = (e,data) => {
    console.log('handle_course')
    console.log(data)
    e.preventDefault();
    this.setState({
      displayed_form: 'course',
      course: data
    });
  };

  handle_join_course = (e,data) => {
    let input = '{"user":[{"pk":'+ this.state.pk +',"username":"'+ this.state.username+'"}]}'
    console.log(input)
    e.preventDefault()
    fetch('http://localhost:8000/api/courses/' + data + '/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token
      },
      body: input
    })
    .then(response => response.json())
    .catch(error => {
      console.log("ERROR: " + error)
      alert(error);
    })
  }

  handle_search = () => {
    fetch('http://localhost:8000/api/courses/?search=' + this.state.search, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(JSON.stringify(json))
      this.setState({
        results: json,
      })
      console.log(this.state.results)
      this.setState({
        displayed_form: 'Search'
      });
    })
    .catch(error => {
      console.log("ERROR: " + error)
    });

    //if display form is already search: refresh
    //else setstate
    
  }
 
  display_form = form => {
    if (form == 'messaging') {
      this.setState({ messaging: !this.state.messaging })
    }
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
        form = <Signup handle_signup={this.handle_signup} />;
        break;
      case 'course':
        form  = <Course course = {this.state.course} userpk = {this.state.pk} token = {this.state.token}/>
        break;
      case 'Search':
        form = <SearchCourse content = {this.state.results} 
                            handle_course = {this.handle_course} 
                            userpk = {this.state.pk}
                            handle_join_course = {this.handle_join_course}/>
        break;

      default:
        {this.state.logged_in? form = <Dashboard userpk = {this.state.pk} handle_course = {this.handle_course}/> : form = null}
        break;
        // form = null
    }

    // let course = <CourseDemo />;
    let messaging = this.state.messaging ? <MessageForm /> : null
    return (
      <div className="App">
        <Navi
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          search = {this.state.search}
          handle_search_value = {this.handle_search_value}
          handle_search = {this.handle_search}
        />

        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.first}`
            : 'Welcome to Studdy Buddy'}
        </h3>
        {form}
        {messaging}
      </div>

    );
  }
}

export default App;
