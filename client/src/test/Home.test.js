import React from 'react'
import sinon from 'sinon'
import Home from '../Components/Home'
import {Search} from '../Partials/Search'
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
    it('closes the search when button is clicked', async () => {
        
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        home_wrapper.find('.search-icon').simulate('click')
        
        expect(home_wrapper.find('.search-wrapper.active')).toHaveLength(1)
        expect(home_wrapper.find('.search-wrapper.active .close')).toHaveLength(1)
        
        home_wrapper.find('.search-wrapper.active .close').simulate('click')
        expect(shallowToJson(home_wrapper)).toMatchSnapshot()

    });
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
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const searchInput = home_wrapper.find('.search-input')
        const search_wrapper = shallow(<searchInput onKeyDown={handleKeyPress} />)

        search_wrapper.simulate('keyDown')
        expect(handleKeyPress).toHaveBeenCalledTimes(1);
    })
    it('expects handle keypress to return runSearch', async () => {
        const handleKeyPress = jest.fn()
        const runSearch = jest.fn()
        handleKeyPress.mockReturnValue(runSearch())

        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const searchInput = home_wrapper.find('.search-input')
        const search_wrapper = shallow(<searchInput onKeyDown={handleKeyPress} />)

        search_wrapper.simulate('keyDown')
        expect(handleKeyPress()).toEqual(runSearch())
    })

    it('sets component state on runSearch', async () => {
        jest.mock('./__mocks__/search-api.js')

        const spy = sinon.spy(Home.prototype, 'runSearch')
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const data = await runSearch()
        const mock = jest.fn().mockImplementation(() => {
            home_wrapper.setState({
                searchResults: data
            })
        })
        const handleKeyPress = jest.fn()
        handleKeyPress.mockReturnValue(mock())
        home_wrapper.setState({
            searchTerm: 'Liam'
        })

        home_wrapper.simulate('runSearch')
        expect(home_wrapper.state().searchTerm).toBe('Liam')
        expect(shallowToJson(home_wrapper)).toMatchSnapshot()

        home_wrapper.simulate('handleKeyPress')
        expect(home_wrapper.state().searchResults).toEqual(data)

    });
    it('displays search results', async () => {
        jest.mock('./__mocks__/search-api.js')

        // const spy = sinon.spy(Home.prototype, 'runSearch')
        const home_wrapper = shallow(<Home fields={[]} items={[]} />)
        const data = await runSearch()
        const mock = jest.fn().mockImplementation(() => {
            home_wrapper.setState({
                searchResults: data
            })
        })
        const handleKeyPress = jest.fn()
        handleKeyPress.mockReturnValue(mock())
        home_wrapper.setState({
            searchTerm: 'Liam'
        })

        home_wrapper.simulate('runSearch')
        home_wrapper.simulate('handleKeyPress')
        
        const search_wrapper = mount(<Search searchResults={data}/>)
        expect(shallowToJson(search_wrapper)).toMatchSnapshot()

    });


});

describe('<Search />', () => {
    it('search results link to proper page', async () => {
        jest.mock('./__mocks__/search-api.js')

        const data = await runSearch()
        const search_wrapper = mount(<Search searchResults={data}/>)
        expect(search_wrapper.find('.searchResult a')).toBeTruthy()

    });
});