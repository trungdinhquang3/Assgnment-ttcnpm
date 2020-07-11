const express = require('express');

module.exports.cook = (req, res, next) => {
	if(!req.cookies.cookId) {
		res.redirect('/auth/login');
		return;
	}

	next();
};

module.exports.user = (req, res, next) => {
	if(!req.cookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	next();
};