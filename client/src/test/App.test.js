import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import sinon from 'sinon'
import {Loader} from '../Partials/Loader'
import getGallery from './__mocks__/gallery-api.js'


describe('<App />', () => {

  it('calls renders without crashing', () => {
    const loader_wrapper = mount(<Loader />)
    expect(loader_wrapper).toMatchSnapshot()
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
    expect(wrapper).toMatchSnapshot()
  })

  it('#getGallery() makes async call to Node backend', async () => {
    const data = await getGallery()
    expect(data).toBeDefined()
})

it('should load gallery and field data', async () => {
    const data = await getGallery()
    expect(data).toBeDefined()
    expect(Object.keys(data)).toContain('field_data')
    expect(Object.keys(data)).toContain('gallery')
})

it('#componentWillMount runs getGallery', async () => {
    const spy = sinon.spy(App.prototype, 'getGallery')
    const wrapper = shallow(<App />)
    wrapper.simulate('componentWillMount')
    expect(spy.calledOnce).toEqual(true)
})
  
});
