import React from 'react'
import sinon from 'sinon'
import Home from '../Components/Home'
import runSearch from './__mocks__/search-api.js'


describe('<Home />', () => {
    it('renders without crashing', () => {
        const home_wrapper = shallow(<Home />)
        expect(home_wrapper).toMatchSnapshot()
    })
    it('should render a search icon button', () => {
        const home_wrapper = shallow(<Home />)
        expect(home_wrapper.find('.search-icon')).toHaveLength(1)
    })
    it('should call handleClick() when clicked', () => {
        const spy = sinon.spy(Home.prototype, 'startSearch')
        const home_wrapper = shallow(<Home />)
        home_wrapper.find('.search-icon').simulate('click')
        expect(spy.calledOnce).toEqual(true)
        expect(home_wrapper.find('.search-wrapper.active')).toHaveLength(1)
    })
    it('should update search term onChange', () => {

        const value = 'Liam'
        const onChange = jest.fn();
        const home_wrapper = shallow(<Home />)
        const searchInput = home_wrapper.find('.search-input')
        const wrapper = shallow(<searchInput onChange={onChange} />)

        wrapper.simulate('change', value)
        expect(onChange).toBeCalledWith(value);
    })
    it('run the search on keypress enter', async () => {

        jest.mock('./__mocks__/search-api.js')
        const home_wrapper = shallow(<Home />)
        const searchInput = home_wrapper.find('.search-input')
        const value = 'Liam'

        
        const users = await runSearch(value)
  
        const wrapper = shallow(<searchInput keyDown={handleKeyDown} />)
        wrapper.simulate('keyDown', value)

        expect(handleKeyDown).toBeCalledWith(value);
        expect(handleKeyDown(value)).toBeDefined()
        
        
    })
    

});