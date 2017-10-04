const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index = require('./routes/index')
const contact = require('./routes/contacts')
const address = require('./routes/addresses')
const group = require('./routes/groups')
const profile = require('./routes/profiles')

app.use('/', index);
app.use('/contacts', contact)
app.use('/addresses', address)
app.use('/profiles', profile)
app.use('/groups', group)



app.listen(3000);
