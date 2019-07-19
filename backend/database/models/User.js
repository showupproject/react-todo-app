const mongoose = require('mongoose')
//define our user
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	todos: [{id: String, task: String, isComplete: String}]
})
//compiling our schema into a Model. A model is a class with which we construct documents.
//In this case, each document will be a user with properties and behaviors as declared in our schema.

const User = mongoose.model('User', UserSchema)

//a user--a document, all user--a collection
//schema - model - a user document +users collection
module.exports = User
