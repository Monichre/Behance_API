import React from 'react'
import App from '../App'
import sinon from 'sinon'
// import Home from '../Components/Home'


describe('<App />', () => {
  
  it('calls renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

});