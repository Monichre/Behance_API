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

app.post('/search', (req, res) => {

  const search_params = req.body.data
  searchUser(search_params).then((response) => {
    console.log(response)
  })

})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(app.get('port'), function () {
  console.log('server running on: ' + app.get('port'))
})



module.exports = app