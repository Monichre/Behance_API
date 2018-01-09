import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import App from '../App'
import sinon from 'sinon'
import Home from '../Components/Home'
import getGallery from './__mocks__/api.js'

// sinon.spy(Foo.prototype, 'componentDidMount');
// const wrapper = mount(<Foo />);
// expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);

describe('#getGallery() makes async call to Node backend', () => {

    it('should load gallery and field data', async () => {
        const data = await getGallery()
        expect(data).toBeDefined()
        expect(Object.keys(data)).toContain('field_data')
        expect(Object.keys(data)).toContain('gallery')
      })

  
});