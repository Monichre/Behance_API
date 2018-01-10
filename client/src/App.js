import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Axios from 'axios'
import Home from './Components/Home'
import Profile from './Components/Profile'
import { Loader } from './Partials/Loader'
import 'semantic-ui-css/semantic.min.css'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      fields: [],
      data_ready: false
    }
  }
  componentWillMount() {
    this.getGallery()
  }
  getGallery(category) {

    const _this = this
    let the_category = category ? category : undefined
    console.log(the_category)
    Axios.get('/gallery', {
        params: {
          query: category
        }
      }).then((response) => {
        console.log(response)
        let items = response.data.gallery.splice(0, 20)
        let fields = response.data.field_data.splice(0, 10)
        _this.setState({
          items: items,
          fields: fields,
          data_ready: true
        })
      }).catch((error) => {
        console.log(error)
      })
  }
  render() {
    if (this.state.data_ready) {
      const { fields, items } = this.state

      return (
        <BrowserRouter>
          <div>
            <Route exact path='/' key='home route' render={(props) => (
              <Home key='home' {...props} fields={fields} items={items} filterCategory={this.getGallery.bind(this)} />
            )} />
            <Route exact path='/profile/:user_id' key='profile route' render={(props) => (
              <Profile key='profile' {...props} />
            )} />
          </div>
        </BrowserRouter>
      )
    } else {
      return <Loader />
    }

  }
}

export default App;
