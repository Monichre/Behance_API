import React, { Component } from 'react'
import Home from './Components/Home'
import 'semantic-ui-css/semantic.min.css';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeComponent: 'Home'
    }
  }
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
