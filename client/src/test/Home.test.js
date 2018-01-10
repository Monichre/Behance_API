import React from 'react'
import sinon from 'sinon'
import Home from '../Components/Home'
import runSearch from './__mocks__/search-api.js'
import { shallowToJson } from 'enzyme-to-json';


describe('<Home />', () => {
    it('renders without crashing', () => {
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        expect(shallowToJson(home_wrapper)).toMatchSnapshot()
    })
    it('should render a search icon button', () => {
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        expect(home_wrapper.find('.search-icon')).toHaveLength(1)
    })
    it('should call handleClick() when clicked', () => {
        const spy = sinon.spy(Home.prototype, 'startSearch')
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        home_wrapper.find('.search-icon').simulate('click')
        expect(spy.calledOnce).toEqual(true)
        expect(home_wrapper.find('.search-wrapper.active')).toHaveLength(1)
    })
    it('should update search term onChange', () => {
        const value = 'Liam'
        const onChange = jest.fn();
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const searchInput = home_wrapper.find('.search-input')
        const wrapper = shallow(<searchInput onChange={onChange} />)

        wrapper.simulate('change', value)
        expect(onChange).toBeCalledWith(value);
    })
    it('run the search on keypress enter', async () => {
        const handleKeyPress = jest.fn()
        // const spy = sinon.spy(Home.prototype, 'handleKeyPress')
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const searchInput = home_wrapper.find('.search-input')
        const search_wrapper = shallow(<searchInput onKeyDown={handleKeyPress}/>)
        
        search_wrapper.simulate('keyDown')
        expect(handleKeyPress).toHaveBeenCalledTimes(1);
    })
});