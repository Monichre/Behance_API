import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Home from './Components/Home'
import renderer from 'react-test-renderer'


it('renders without crashing', () => {

  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})


test('Home componentWillMount executes API calls', () => {
  
  const tree = renderer 
    .create(<Home />)
    .toJSON()

  expect(tree).toMatchSnapshot()
  
})
