module.exports = {
	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.send({error: 'Please sign in first'})
	}
}
