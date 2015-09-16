var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
	res.render('index');
	res.clearCookie('user');
});

router.post('/login', function(req, res, next) {
	var name = req.body.username;
	res.cookie('user', name)
	//res.end()
	//console.log(req)
	res.render('users')
})


router.get('/posts', function(req, res){
	res.json({posts: req.app.locals.messages});
});
module.exports = router;
