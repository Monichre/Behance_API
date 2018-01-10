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
    let match = {
        params: {
            user_id: 1853107
        }
    }
    const profile_wrapper = shallow(<Profile match={match} />)
    profile_wrapper.propTypes = {
        match: object.isRequired
    }
    it('search results link to proper page and mounts with user_id', () => {

        expect(shallowToJson(profile_wrapper)).toMatchSnapshot()

    });
 
    it('sets state properly', async () => {

        let data = await runSearch()
        data[0].data_ready = true
        data[0].projects = [{
            id: 1,
            name: 'project',
            fields: ['field'],
            covers: {
                230: 'img'
            }

        }]
        data[0].sections = {
            About: 'About me'
        }
        data[0].social_links = []
        data[0].followers = []
        data[0].following = []
        data[0].work_experience = []


        const { first_name, last_name, fields, images, occupation, location, social_links, followers, following, work_experince, stats, website, projects, sections, active_project, data_ready } = data[0]

        profile_wrapper.setState({
            first_name: first_name,
            last_name: last_name,
            fields: fields,
            images: images,
            occupation: occupation,
            location: location,
            social_links: social_links,
            stats: stats,
            followers: followers, 
            following: following, 
            work_experince: work_experince,
            website: website,
            projects: projects,
            sections: sections,
            active_project: active_project,
            data_ready: data_ready

        })

        Object.keys(profile_wrapper.state()).forEach((item) => {
            expect(item).toBeTruthy()
        })
        expect(shallowToJson(profile_wrapper)).toMatchSnapshot()
        

    });


});