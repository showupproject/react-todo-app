const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')
// Load User model
const User = require('../database/models/User.model')

router.get('/login', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		res.json({user: req.user})
	} else {
		res.json({user: null})
	}
})

router.post('/login', (req, res, next) => {
	console.log('Inside POST /login callback')
	passport.authenticate('local', (err, user, info) => {
		console.log('Inside passport.authenticate() callback')
		if (err) return res.send({error: 'error in authenticating'})
		if (!user) return res.send({error: 'no such user'})
		req.login(user, (err) => {
			console.log('Inside req.login() callback')
			console.log(`req.session.passport: ${req.session.passport}`)
			console.log(`req.user: ${req.user}`)
			return res.send(req.user.todos)
		})
	})(req, res, next)
})

// router.post('/login', passport.authenticate('local'), (req, res) => {
// 	console.log('logged in', req.user)
// 	var userInfo = {
// 		username: req.user.username
// 	}
// 	res.send(userInfo)
// })

router.post('/register', (req, res) => {
	const {email, password} = req.body
	User.findOne({email: email}).then((user) => {
		if (user) {
			console.log('Email already exists')
			console.log(req.sessionID)
			res.send({newUser: false})
		} else {
			//use model to create new document(a user)
			const newUser = new User(req.body)
			bcrypt.hash(newUser.password, 10, (err, hash) => {
				if (err) throw err
				newUser.password = hash
				newUser
					.save()
					.then(() => {
						console.log(`new user ${email} registered`)
						res.send({newUser: true})
					})
					.catch((err) => console.log(err))
			})
		}
	})
})

router.get('/logout', (req, res, next) => {
	console.log('user hit logout endpoint')
	req.logout()
	res.send({logout: 'success'})
})

module.exports = router
