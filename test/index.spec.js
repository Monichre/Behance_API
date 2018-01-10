const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const {
    Constants
} = require('../server/constants')
const nock = require('nock')

describe('GET gallery', function () {
    this.timeout(6000)

    it('returns web design collections by default', async() => {
        let data = await Constants.getGallery()
        expect(Array.isArray(data.data.collections)).to.equal(true)
    })
    it('returns array of objects', async() => {
        let data = await Constants.getGallery()
        data.data.collections.forEach((collection) => {
            expect(collection).to.be.a('object')
        })

    })
})


describe('GET fields', function() {
    it('returns the fields', async () => {
        let data = await Constants.getFields()
        expect(Array.isArray(data.data.fields)).to.equal(true)
        expect(data.data.fields).to.have.length.above(1)
 
    })
})

describe('searchUser', function() {

    it('returns users', async () => {
        let data = await Constants.searchUser('Liam')
        expect(Array.isArray(data.data.users)).to.equal(true)
        expect(data.data.users).to.have.length.above(1)
    })
    it('returns users with the right name', async () => {
        let data = await Constants.searchUser('Liam')
        const user = data.data.users
        expect(user[0]).to.be.a('object')
        expect(user[0].display_name.includes('Liam')).to.equal(true)
    })
    
})
describe('getUser', function () {
    it('returns correct user', async () => {
        let data = await Constants.getUser(1853107)
        expect(data.data.user).to.be.a('object')
        expect(data.data.user.id).to.equal(1853107)
    })
})