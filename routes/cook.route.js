const express = require('express');
const route = express.Router();
const db = require('../db.js');
const shortid = require('short-id');

route.get('/orderList', (req, res) => {
	res.render('cook/orderList.pug', {
		orderList: db.get('orderList').value()
	});
});

route.get('/detail/:id', (req, res) => {
	var id = req.params.id;
	res.render('cook/detail.pug', {
		order: db.get('orderList').find({ orderId: id }).value()
	});
});

route.get('/foodList', (req, res) => {
	res.render('cook/foodList.pug', {
		foodList: db.get('foodList').value()
	});
});

route.post('/foodList', (req, res) => {
	req.body.id = shortid.generate();
	req.body.state = true;
	req.body.image = '/images/1.jpg';
	db.get('foodList').push(req.body).write();
	res.redirect('/cook/foodList');
});

route.get('/foodList/update-state-to-true', (req, res) => {
	var foodListNow = db.get("foodList").value();
	for (var food of foodListNow) {
		food.state = true;
	}
	db.set('foodList', foodListNow).write();
	res.redirect('/cook/foodList');
});

route.get('/foodList/update-state-to-false', (req, res) => {
	var foodListNow = db.get("foodList").value();
	for (var food of foodListNow) {
		food.state = false;
	}
	db.set('foodList', foodListNow).write();
	res.redirect('/cook/foodList');
});

route.get('/foodList/state/:id', (req, res) => {
	var id = req.params.id;
	var stateNow = db.get('foodList').find({ id: id }).value().state;
	db.get('foodList').find({ id: id }).set('state', !stateNow).write();
	res.redirect('/cook/foodList');
});

route.get('/createNotice', (req, res) => {
	res.render('cook/createNotice.pug');
});

route.get('/orderList/state/:id', (req, res) => {
	var id = req.params.id;
	var stateNow = db.get('orderList').find({ orderId: id }).value().state;
	db.get('orderList').find({ orderId: id }).set('state', !stateNow).write();
	res.redirect('/cook/orderList');
});

route.post('/createNotice', (req, res) => {
	if (!db.get('orderList').find({ orderId: req.body.orderId }).value()){
		res.redirect('/cook/createNotice');
		return;
	}
	req.body.id = shortid.generate();
	db.get('notification').push(req.body).write();
	res.redirect('/cook/orderList');
});

module.exports = route;