require('dotenv').load()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const Axios = require('axios')
const {Constants} = require('./constants')
const app = express()

console.log(process.env.REACT_APP_API_KEY)

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

const getGallery = async () => {
  let data = await Axios.get(Constants.URLS.collections, {
    params: {
      q: 'architecture, art, web design',
      api_key: process.env.REACT_APP_API_KEY
    }
  })
  return data
}


app.get('/gallery', (req, res) => {

  let potential_data

  getGallery().then((response) => {
    potential_data = response.data.collections
    console.log(potential_data)
    res.send(potential_data)
  }).catch((error) => {
    console.log(error)
  })
  
  console.log(potential_data)
  
  
})

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})



module.exports = app
