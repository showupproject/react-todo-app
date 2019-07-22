const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

// Load User model
const User = require('./database/models/User.model')

module.exports = function(passport) {
	//return de shi user
	passport.use(
		new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
			User.findOne({email: email}).then((user, err) => {
				// In case of any error, return using the done method
				if (err) return done(err)
				// Username does not exist, log error & redirect back
				if (!user) {
					console.log('User Not Found with ' + email)
					return done(null, false, {message: 'That email is not registered'})
				}
				//match password
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err
					if (isMatch) {
						return done(null, user)
					} else {
						return done(null, false, {message: 'Password incorrect'})
					}
				})
			})
		})
	)

	/*If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
	Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
	In order to support login sessions, Passport will serialize and deserialize user instances to and from the session db.
	only the user ID is serialized to the session, keeping the amount of data stored within the session small. 
	When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
	*/

	// called on login, saves the id to session store database and req.session.passport.user = {id:'..'}
	passport.serializeUser((user, done) => {
		console.log('*** passport.serializeUser called, user: ')
		console.log(user) // the whole raw user object!
		done(null, user.id)
	})

	// which matched our session id to the session-file-store and retrieved our user id.
	//user object attaches to the request as req.user
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			console.log('*** passport.deserializeUser called')
			console.log(user)
			done(err, user)
		})
	})
}
