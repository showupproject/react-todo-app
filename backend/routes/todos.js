const express = require('express')
const router = express.Router()
const passport = require('passport')
// Load User model
const User = require('../database/models/User')

router.post('/', (req, res, next) => {
	const newTodo = req.body
	console.log('newTodo: ', newTodo)
	User.findAndModify({
		query: {email: req.user.email},
		update: {$push: {todos: newTodo}},
		function(error, success) {
			if (error) {
				console.log('addtodo error', error)
			} else {
				console.log(success)
			}
			res.end()
		}
	})
})

module.exports = router
