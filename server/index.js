

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const Axios = require('axios')
const { Constants } = require('./constants')
const app = express()

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))


app.get('/gallery', (req, res) => {
  const category = req.query.query
  let potential_data = {}
  Constants.getGallery(category).then((response) => {
    potential_data.gallery = response.data.collections

    Constants.getFields().then((fields_response) => {
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
app.post('/search', (req, res) => {
  const search_params = req.body.data
  Constants.searchUser(search_params).then((response) => {
    let user_data = response.data.users
    res.send(user_data)
  }).catch((error) => {
    console.log(error)
    res.send(error)
  })
})

app.get('/get-user', (req, res) => {

  const user_id = req.query.user_id
  console.log(user_id)
  let potential_data = {}

  Constants.getUser(user_id).then((response) => {
    potential_data.user_data = response.data.user

    Constants.getUserProjects(user_id).then((project_response) => {
      potential_data.projects = project_response.data.projects

      Constants.getUserFollowers(user_id).then((followers_response) => {
        potential_data.followers = followers_response.data.followers

        Constants.getUserFollowing(user_id).then((following_response) => {
          potential_data.following = following_response.data.following

          Constants.getUserWorkExperience(user_id).then((work_experience_response) => {
            potential_data.work_experience = work_experience_response.data.work_experience

            res.send(potential_data)
            
          }).catch((error) => {
            console.log(error)
            res.send(error)
          })

        }).catch((error) => {
          console.log(error)
          res.send(error)
        })

      }).catch((error) => {
        console.log(error)
        res.send(error)
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

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(app.get('port'), function () {
  console.log('server running on: ' + app.get('port'))
})



