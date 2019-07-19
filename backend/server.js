const express = require('express')
const morgan = require('morgan')
const path = require('path')
const dbConnection = require('./database/db.js')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const passport = require('passport')
const uid = require('uid-safe')
require('./passport')(passport)
const user = require('./routes/user')
const todos = require('./routes/todos')

const PORT = 8080

//const dev = process.env.NODE_ENV != 'production'

const app = express()
app.use(morgan('dev'))

// first so we have req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//session middleware part
// add session management to Express
//initiate session, generate session id
//the get route will have the req obj with req.sessionID
app.use(
	expressSession({
		secret: uid.sync(18),
		cookie: {
			maxAge: 86400 * 1000 // 24 hours in milliseconds
		},
		store: new MongoStore({mongooseConnection: dbConnection}),
		resave: false,
		saveUninitialized: false
	})
)

//passport.initialize() middleware is required to initialize Passport after strategy use
app.use(passport.initialize())
app.use(passport.session())

app.use('/user', user)
app.use('/todos', todos)
// app.get('/*', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
// 		if (err) {
// 			res.status(500).send(err)
// 		}
// 	})
// })

app.listen(PORT, (err) => {
	if (err) throw err
	console.log(`App listening on PORT: ${PORT}`)
})
