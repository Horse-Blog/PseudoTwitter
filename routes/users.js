
var express = require('express');
var router = express.Router();

var messages = [];
/* GET users listing. */

router.get('/', function(req, res, next) {
  console.log('something');
  if(req.cookies.user === undefined) {
  		res.redirect('/login');
   	} else {
  res.render('users', { knots: messages });
}
});

router.post('/', function(req, res, next){
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
      element.type = "mine"
    } else {
      element.type = "friend"
    }

  });
  console.log(req.app.locals.messages);

  res.render('users', { knots: req.app.locals.messages });
});




module.exports = router;
