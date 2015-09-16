
var express = require('express');
var router = express.Router();

var messages = [];
var types = [
  {name: "sheepshank", image_url: "images/sheep.png"},
  {name: "round turn and two half-hitches", image_url: "images/rtt.jpg"},
  {name: "flying bowline", image_url: "showoff.gif"}
];
/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	if(req.cookies.user == undefined) {
// 		res.redirect('/login')
// 	}
//
// });

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // posts.push({name: , body:req.body})
  console.log('something');
  if(req.cookies.user == undefined) {
    console.log('You are not logged in');
  		res.redirect('/login');
   	}
  res.render('users', { knots: messages });
});

router.post('/', function(req, res, next){
  if(req.body.message !== ""){
  req.body.user = req.cookies.user;
  messages.unshift(req.body);
  console.log(messages);
}
  console.log(messages);
  messages.map(function(element, index, array){
    if(index % 2 === 0 || index === 0) {
      element.class = 'even';
    } else {
      element.class = 'odd';
    }
  });
  console.log(messages);

  res.render('users', { knots: messages });
});


module.exports = router;
