const express = require('express')
const router = express.Router()
// Load User model
const User = require('../database/models/User.model')
const {isLoggedIn} = require('../middleware')

router.get('/', isLoggedIn, (req, res, next) => {
	console.log('sending todos')
	res.send({email: req.user.email, todos: req.user.todos})
})

router.post('/', isLoggedIn, (req, res, next) => {
	const newTodo = req.body
	console.log('newTodo received:', newTodo)
	console.log('now updating database')
	User.findOneAndUpdate(
		{email: req.user.email},
		{$push: {todos: newTodo}},
		function(err, success) {
			if (err) {
				console.log('addtodo error', err)
				res.send({error: 'addtodo error'})
			} else {
				console.log(success)
				res.send({error: null})
			}
		}
	)
})

router.delete('/:id', isLoggedIn, (req, res, next) => {
	const id = req.params.id
	User.findOneAndUpdate(
		{email: req.user.email},
		{$pull: {todos: {id: id}}},
		function(err, success) {
			if (err) {
				console.log('deletetodo error', err)
				res.send({error: 'deletetodo error'})
			} else {
				console.log(success)
				res.send({error: null})
			}
		}
	)
})

module.exports = router
