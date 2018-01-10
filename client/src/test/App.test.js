import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import sinon from 'sinon'
import Home from '../Components/Home'


describe('<App />', () => {

  it('calls renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders once', () => {
    sinon.spy(App.prototype, 'render')
    const wrapper = mount(<App />)
    expect(App.prototype.render.calledOnce).toEqual(true)
  })


  it('renders the browser router', () => {
    const wrapper = shallow(<App />)
    BrowserRouter.displayName = 'BrowserRouter'
    expect(wrapper.find(BrowserRouter)).toBeTruthy()
  })

  it('renders unique routes', () => {
    const wrapper = shallow(<App />)
    Route.displayName = 'Route'
    expect(wrapper.find(Route)).toHaveLength(2)
  })
  
});
