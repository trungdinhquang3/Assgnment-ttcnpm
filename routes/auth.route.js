const express = require('express');
const route = express.Router();

route.get('/login', (req, res) => {
	res.render('auth/login.ejs');
});

route.post('/login', (req, res) => {
	if(req.body.userName === 'toan' && req.body.password === '1234') {
		res.cookie('userId', 'sfasf');
		res.redirect('/');
		return;
	}

	if(req.body.userName === 'trung' && req.body.password === '1234') {
		res.cookie('cookId', '1234');
		res.redirect('/cook/orderList');
		return;
	}

	res.render('auth/login.ejs');

});

route.get('/logout', (req, res) => {
	res.clearCookie('cookId');
	res.clearCookie('userId');
	res.redirect('/');
});

module.exports = route;