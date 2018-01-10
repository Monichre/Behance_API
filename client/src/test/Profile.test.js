import React from 'react'
import sinon from 'sinon'
import Home from '../Components/Home'
import Profile from '../Components/Profile'
import { Search } from '../Partials/Search'
import { BrowserRouter, Route } from 'react-router-dom'
import runSearch from './__mocks__/search-api.js'
import { shallowToJson } from 'enzyme-to-json'
import { string, object } from 'prop-types'


describe('<Profile />', () => {
    it('search results link to proper page and mounts with user_id', async () => {

        let match = {
            params: {
                user_id: 1853107
            }
        }
        const profile_wrapper = mount(<Profile match={match} />)
        profile_wrapper.propTypes = {
            match: object.isRequired
        }
        expect(shallowToJson(profile_wrapper)).toMatchSnapshot()

    });

});