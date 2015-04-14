module.exports = function(app, passport){	
	app.get('/login', function(req, res){
		res.render('login', {message: req.flash('loginMessage')})
	})
	
	app.get('/signup', function(req, res){
		res.render('signup', {message: req.flash('signupMessage')})
	})
	
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile', {user: req.user})
	})
	
	app.get('/logout', function(req, res){
		req.logout()
		res.redirect('/')
	})
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}))
	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}))
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next()
	
	res.redirect('/')
}