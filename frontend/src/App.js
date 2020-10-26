import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import MessageForm from './components/MessageForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('state when rendering: ')
    console.log(this.state)
    let form = <MessageForm />
    return (
      <div className="App">
        {form}
      </div>
    );
  }
}

export default App;
