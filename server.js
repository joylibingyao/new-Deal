var path = require('path');
var express = require('express')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, FacebookStrategy = require('passport-facebook').Strategy
, session = require('express-session')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
var app = express();



//starts upload
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
//todo more
//ends upload


//open folder public for front-end 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//starts session all
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
//ends session all
// require path so that we can use path stuff like path.join


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);


// ---------JUNG_______________
//var appointments = angular.module('appointments',['angularPayments','ngRoute']);

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');


passport.use( new LocalStrategy( function(username, password, done) {
	//console.log('con-passport2', username, password);
	//#2 ask db and see username & password
	UserModel.findOne( {username:username, password:password}, function(err, user) {
		if (user) {
      		// console.log('con-passport3', user);
			return done(null, user);
		}//ends if
		else {
  			return done(null, false, {message:'login info is incorrect'} );
  		}//ends else
	} )//ends usermodel.findone

  }//ends method
)); //ends passort-local


passport.serializeUser(function(user, done) {
  done(null, user.id);
}); //ends passport.serializeUser

passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
    // console.log('passport',user);
  }); //ends User.findById
});//ends passport.deserializeUser

app.use(passport.initialize());
app.use(passport.session());

//ends passport#1







//start passport-facebook#1
passport.use(new FacebookStrategy({
    clientID: '183293848006',
    clientSecret: '6f00b9dbef5e721ebec3cd906f8aad18',
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
  	// console.log('fb', profile.id);
  	process.nextTick(function(){
 

	    UserModel.findOne({ facebookId: profile.id }, function (err, user) {
	      //return done(err, user);
	      // console.log('fb-save1', user);
	      if(err) { return done(err); }
	      if(user){ console.log('fb-exist', user); return done(null, user); }
	      else {

				var newUser = UserModel();
					newUser.facebookId = profile.id;
					newUser.facebooktoken = accessToken;
					newUser.username = profile.name.givenName + ' ' + profile.name.familyName;
					//newUser.fb.facebookemail = profile.emails[0].value;
					newUser.save(function(err) {
	                        if (err)
	                            console.log(err);

	                        // if successful, return the new user
	                        return done(null, newUser);
	                    });

					// console.log('fb-save2', profile);
	      }//ends else
	    });//end UserModel.findOne
	  })//ends process.nextTick
	  }//ends function
	
));
//ends passport-facebook#1


//start passport-facebook#2
app.get('/auth/facebook',
  passport.authenticate('facebook') 
  );
	//passport.authenticate('facebook', {scope:['email']} ));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile

    res.redirect('/#/login');
  });
//ends passport-facebook#2


//start passport#2
//as router first use passport local strategy first
app.get('/logout', function(req, res){
  req.logout();
  //res.redirect('/');
});//ends logout 

app.post("/login", passport.authenticate('local',{ session: true }), function(req, res){
	// console.log('route-login1',req.body);
	// console.log('route-login2',req.user);
	res.json(req.user);
	//res.redirect('/users/' + req.user.username); //this will redirect to profile page
	//res.json('yes', req.user);
});

app.get("/loggedin", function(req,res){
	// console.log('route-loggedin2',req.user);
	// console.log('route-loggedin', req.isAuthenticated());
	
	res.send(req.isAuthenticated(),req.user);
});//ends loggedin

app.post("/register", function(req, res){
	UserModel.findOne({ username:req.body.username }, function(err,user){
		if(user) {
			res.status(401).json({error:'username exists'});
			console.log('route-reg2',user);
		}//ends if
		else {
			var newUser = UserModel(req.body);
			newUser.save(function(err, user){
				res.json(user);
				req.login(user, function(err) {
				  if (err) { return next(err); }
				  //return res.redirect('/users/' + req.user.username);
				  return true; //true = is user logged in - check ngroutes
				}); //passport will login user
			});//ends newUser.save method
		}//ends else
	} );//ends UserModel.findOne 
// console.log('route-reg1', req.body);
});//ends register

app.get('/showimg', function(req, res) {
  UserModel.find({ url:{$exists:true} }, function(err, links) {
    res.json(links);
    // console.log('find',links);
  });
});
// add a link to the list
app.post('/uploadimg', function(req, res) {
	console.log(req.body, "req.body");
	console.log(req.body.id,"user _id");
  // var newUrl = new UserModel(req.body);
  // newUrl.save(function(err) {

  	// console.log(req.body.id+" body_id");
  	// console.log(req.body.url+" body_data");
  	UserModel.update({_id:req.body.id },{$addToSet:{url:req.body.url}},function(err){
  		//console.log('updating');
  		if(err){
  			res.send('error is here');
  		}else{
  			console.log('save');
  			//res.redirect('/#/your_profile');
  			
  		}
  	});


  })



//ends passport#2

// ------------JUNG____________________
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

app.listen(8000, function() {
  console.log('cool stuff on: 8000');
  console.log('Scheduling');
});

