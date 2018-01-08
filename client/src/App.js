import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {Constants} from './constants.js'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {Constants.routes}
      </BrowserRouter>
    )
  }
}

export default App;
