const mongoose = require('mongoose')
//db config
const db = require('./keys').mongoURI
//connect to mongo
mongoose
	.connect(db, {useNewUrlParser: true})
	.then(() => console.log('Mongodb connected...'))
	.catch((err) => {
		console.log('error connecting to Mongo: ')
		console.log(err)
	})

module.exports = mongoose.connection
