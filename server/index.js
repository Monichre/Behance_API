
require('dotenv').load()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})

module.exports = app
