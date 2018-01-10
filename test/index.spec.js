const chai = require('chai')
const expect = chai.expect
const {
    Constants
} = require('../server/constants')


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


describe('GET fields', function () {
    it('returns the fields', async() => {
        let data = await Constants.getFields()
        expect(Array.isArray(data.data.fields)).to.equal(true)
        expect(data.data.fields).to.have.length.above(1)

    })
})

describe('searchUser', function () {
    it('returns users', async() => {
        let data = await Constants.searchUser('Liam')
        expect(Array.isArray(data.data.users)).to.equal(true)
        expect(data.data.users).to.have.length.above(1)
    })
    it('returns users with the right name', async() => {
        let data = await Constants.searchUser('Liam')
        const user = data.data.users
        expect(user[0]).to.be.a('object')
        expect(user[0].display_name.includes('Liam')).to.equal(true)
    })

})
describe('getUser', function () {
    it('returns correct user', async() => {
        let data = await Constants.getUser(1853107)
        expect(data.data.user).to.be.a('object')
        expect(data.data.user.id).to.equal(1853107)
    })
})
describe('getUserProjects', function () {
    it('returns users projects', async() => {
        let data = await Constants.getUserProjects(1853107)
        expect(data.data.projects).to.be.a('array')
        expect(data.data.projects).to.have.length.above(1)
    })
})
describe('getUserFollowers', function () {
    it('returns correct users followers', async() => {
        let data = await Constants.getUserFollowers(1853107)
        expect(data.data.followers).to.be.a('array')
        expect(data.data.followers).to.have.length.above(1)
        
    })
})
describe('getUserFollowing', function () {
    it('returns correct user following', async() => {
        let data = await Constants.getUserFollowing(1853107)
        expect(data.data.following).to.be.a('array')
        expect(data.data.following).to.have.length.above(1)
    })
})
describe('getUserWorkExperience', function () {
    it('returns correct user work experience', async() => {
        let data = await Constants.getUserWorkExperience(1853107)
        expect(data.data.work_experience).to.be.a('array')
        
    })
})