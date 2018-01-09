require('dotenv').load()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const Axios = require('axios')
const {
  Constants
} = require('./constants')
const app = express()

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

const getGallery = async (query = 'web design') => {
  let data = await Axios.get(Constants.URLS.collections, {
    params: {
      q: query,
      api_key: process.env.REACT_APP_API_KEY
    }
  })
  return data
}
const getFields = async () => {
  let field_data = await Axios.get(Constants.URLS.fields, {
    params: {
      api_key: process.env.REACT_APP_API_KEY
    }
  })
  return field_data
}
const searchUser = async (user) => {
  let user_data = await Axios.get(Constants.URLS.users, {
    params: {
      q: user,
      api_key: process.env.REACT_APP_API_KEY
    }
  })
  return user_data
}
const getUser = async (user_id) => {
  let user = await Axios.get(Constants.URLS.users + `/${user_id}?client_id=${process.env.REACT_APP_API_KEY}`)
  return user
}
const getUserProjects = async (user_id) => {
  let projects = await Axios.get(Constants.URLS.users + `/${user_id}/projects?client_id=${process.env.REACT_APP_API_KEY}`, {
    params: {
      sort: 'views'
    }
  })
  return projects
}
const getUserFollowers = async (user_id) => {
  let followers = await Axios.get(Constants.URLS.users + `/${user_id}/followers?client_id=${process.env.REACT_APP_API_KEY}`)
  return followers
}
const getUserFollowing = async (user_id) => {
  let following = await Axios.get(Constants.URLS.users + `/${user_id}/following?client_id=${process.env.REACT_APP_API_KEY}`)
  return following
}
const getUserWorkExperience = async (user_id) => {
  let work_experience = await Axios.get(Constants.URLS.users + `/${user_id}/work_experience?client_id=${process.env.REACT_APP_API_KEY}`)
  return work_experience
}


app.get('/gallery', (req, res) => {
  let potential_data = {}
  getGallery().then((response) => {
    potential_data.gallery = response.data.collections
    getFields().then((fields_response) => {
      let field_data = fields_response.data.fields
      potential_data.field_data = field_data
      res.send(potential_data)
    }).catch((error) => {
      console.log(error)
    })
  }).catch((error) => {
    console.log(error)
    res.send(error)
  })
})

app.get('/get-user', (req, res) => {

  const user_id = req.query.user_id
  let potential_data = {}

  getUser(user_id).then((response) => {
    potential_data.user_data = response.data.user

    getUserProjects(user_id).then((project_response) => {
      potential_data.projects = project_response.data.projects

      getUserFollowers(user_id).then((followers_response) => {
        console.log(followers_response.data.followers)
        potential_data.followers = followers_response.data.followers

        getUserFollowing(user_id).then((following_response) => {
          console.log(following_response.data.following)
          potential_data.following = following_response.data.following

          getUserWorkExperience(user_id).then((work_experience_response) => {
            console.log(work_experience_response.data.work_experience)
            potential_data.work_experience = work_experience_response.data.work_experience
            res.send(potential_data)
            
          }).catch((error) => {
            console.log(error)
          })

        }).catch((error) => {
          console.log(error)
        })

      }).catch((error) => {
        console.log(error)
      })
     
    }).catch((error) => {
      console.log(error)

      res.send(error)
    })
  }).catch((error) => {
    console.log(error)

    res.send(error)
  })
  
})


app.post('/search', (req, res) => {
    const search_params = req.body.data
    searchUser(search_params).then((response) => {
      let user_data = response.data.users
      res.send(user_data)
    }).catch((error) => {
      console.log(error)
      res.send(error)
    })
  })

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(app.get('port'), function () {
  console.log('server running on: ' + app.get('port'))
})



module.exports = app