
var express = require('express');
var router = express.Router();

var messages = [];
var types = [
  {name: "sheepshank", image_url: "images/sheep.png"},
  {name: "round turn and two half-hitches", image_url: "images/rtt.jpg"},
  {name: "flying bowline", image_url: "showoff.gif"}
];
/* GET users listing. */
router.get('/', function(req, res, next) {
	if(cookies.user !== req.body.username) {
		res.redirect('/login')
	}

});

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // posts.push({name: , body:req.body})
  res.render('users', { knots: messages });
});

router.post('/', function(req, res, next){
    messages.push(req.body);
  console.log(messages);
  res.render('users', { knots: messages });

});


module.exports = router;