// app/routes.js
var Registration  = require('../app/models/registration');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	

	// =====================================
	// LOGIN home ===============================
	// =====================================
	// show the login form
	app.get('/', function(req, res) {
		var titlePage = "MMA se marient ! - identification";
		// render the page and pass in any flash data if it exists
		res.render(
			'login.ejs', 
			{ 
				message: req.flash('loginMessage'),
				titlePage: titlePage
			});
	});

	// process the login form
	app.post('/', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		var titlePage = "MMA se marient ! - Welcome Dude";
		res.render('profile.ejs', {
			user : req.user, // get the user out of session and pass to template
			titlePage: titlePage,
			message: req.flash('confirmMsg')
		});
	});

	// process the inscription form
	app.post('/profile', function(req, res) {
		var imComing = req.body.imComing;
		
		/* imComing yes */
		if(imComing==1){
			var nbGuest = req.body.nbGuest,
			firstName = req.body.firstName,
			lastName = req.body.lastName,
			email = req.body.email,
			vege = req.body.vegetarian,
			transportation = req.body.transportation,
			availableQuantity = req.body.availableQuantity,
			neededQuantity = req.body.neededQuantity,
			accomodation = req.body.accomodation,
			dayAfter = req.body.dayAfter,
			message = req.body.message,
			guestTab = [];
			
			for (var i=0;i<nbGuest;i++){
				var optCount = i + 1;
				var guest = {
					firstName: req.body["guestFirstName" +optCount],
					lastName: req.body["guestLastName" +optCount],
					vege: req.body["guestVege" +optCount]
				}
				guestTab.push(guest);
			}

		    var addUser = new Registration({
				imComing: imComing,
				firstName: firstName,
				lastName: lastName,
				email: email,
				vege: vege,
				guest: guestTab,
				transportation: transportation,
				availableQuantity: availableQuantity,
				neededQuantity: neededQuantity,
				accomodation: accomodation,
				dayAfter: dayAfter,
				message: message
	  		});
		}else{
			/* imComing no */
			var firstName = req.body.firstNameNo,
			lastName = req.body.lastNameNo,
			message = req.body.messageNo;

			var addUser = new Registration({
				imComing: imComing,
				firstName: firstName,
				lastName: lastName,
				message: message
			});
		}

		
  		addUser.save(function(err) {
		  if (err) throw err;
		  	req.flash('confirmMsg', 'Merci ta réponse a bien été envoyé !');
			res.redirect("/profile");
		});
		
	    
	});

	// =====================================
	// LIST ==============================
	// =====================================
	app.get('/list', isLoggedIn, function(req, res){
		var titlePage = "Liste des invités";
		var query = Registration.find({});
		query.sort({'lastName': 1});
		query.exec(function(err, invitList){
			if(err)
				res.send("erreur "+err);
			res.render('list.ejs', {
				invitList : invitList,
				titlePage: titlePage
			});
		});
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/*', function(req, res) {
    	res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
