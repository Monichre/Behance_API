require('dotenv').load()
const Axios = require('axios')

const Constants = {
    URLS: {
        root: 'https://api.behance.net/v2',
        collections: 'https://api.behance.net/v2/collections',
        users: 'https://api.behance.net/v2/users',
        projects: 'https://api.behance.net/v2/projects',
        fields: 'https://api.behance.net/v2/fields'
    },
    getGallery: async (query = 'web design') => {
        let data = await Axios.get(Constants.URLS.collections, {
          params: {
            q: query,
            api_key: process.env.REACT_APP_API_KEY
          }
        })
        return data
      },
      getFields: async () => {
        let field_data = await Axios.get(Constants.URLS.fields, {
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
        })
        return field_data
      },
      searchUser: async (user) => {
        let user_data = await Axios.get(Constants.URLS.users, {
          params: {
            q: user,
            api_key: process.env.REACT_APP_API_KEY
          }
        })
        return user_data
      },
      getUser: async (user_id) => {
        let user = await Axios.get(Constants.URLS.users + `/${user_id}?client_id=${process.env.REACT_APP_API_KEY}`)
        return user
      },
      getUserProjects: async (user_id) => {
        let projects = await Axios.get(Constants.URLS.users + `/${user_id}/projects?client_id=${process.env.REACT_APP_API_KEY}`, {
          params: {
            sort: 'views'
          }
        })
        return projects
      },
      getUserFollowers: async (user_id) => {
        let followers = await Axios.get(Constants.URLS.users + `/${user_id}/followers?client_id=${process.env.REACT_APP_API_KEY}`)
        return followers
      },
      getUserFollowing: async (user_id) => {
        let following = await Axios.get(Constants.URLS.users + `/${user_id}/following?client_id=${process.env.REACT_APP_API_KEY}`)
        return following
      },
      getUserWorkExperience: async (user_id) => {
        let work_experience = await Axios.get(Constants.URLS.users + `/${user_id}/work_experience?client_id=${process.env.REACT_APP_API_KEY}`)
        return work_experience
      }
      
}

module.exports.Constants = Constants