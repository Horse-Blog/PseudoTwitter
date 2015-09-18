var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/login', function(req, res, next) {
	res.clearCookie('user')
	res.render('index')
});

router.get('/', function(req, res, next) {
	res.redirect('/login');
});

router.post('/', function(req, res, next) {
	var name = req.body.username;
	res.cookie('user', name)

	if(name !== "") {
  		res.render('users')
   	} else {
   		res.redirect('/login')
   	}

});

router.get('/posts', function(req, res){
	res.json({posts: req.app.locals.messages});
});


router.get('/profile', function(req, res) {
  res.render('profile_pg')
})

router.get('/profileInfo', function(req, res) {
  var profileObj = [];
  for(var i = 0; i < req.app.locals.messages.length; i ++) {
    if(req.app.locals.messages[i].user === req.cookies.user) {
      profileObj.push(req.app.locals.messages[i])
    }
  }
  res.json({profile: profileObj})
})

router.get('/friendInfo', function(req, res) {
  var frndObj = [];
  for(var i = 0; i < req.app.locals.messages.length; i ++) {
    if(req.app.locals.messages[i].user !== req.cookies.user) {
      frndObj.push(req.app.locals.messages[i])
    }
  }
  res.json({frndProfile: frndObj})
})

//users.js routes

var messages = [];

router.post('/users', function(req, res, next){
  if(req.body.message !== ""){
  req.body.user = req.cookies.user;
  req.app.locals.messages.unshift(req.body);
}
  req.app.locals.messages.map(function(element, index, array){
    if(index % 2 === 0 || index === 0) {
      element.class = 'even';
    } else {
      element.class = 'odd';
    }

    if(element.user === req.cookies.user) {
      element.type = "mine";
    } else {
      element.type = "friend";
    }

  });


  res.render('users', { knots: req.app.locals.messages });
});

router.post('/dele', function(req,res, next){
	var num = req.body.id;
	console.log(req.app.locals.messages);
	// console.log(req.body.id);
	req.app.locals.messages[num].message = "removed";
	req.app.locals.messages[num].class = "deleted";

});



module.exports = router;
