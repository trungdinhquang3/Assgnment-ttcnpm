const express = require('express');
const route = express.Router();
const db = require('../db.js');
const auth = require('../middleware/auth.middleware.js');

route.get('/', (req, res) => {
  if (req.cookies.userId){
    var id = req.cookies.userId;
    var cart = db.get('users').find({ id: id }).value().cart;
    var cartMapped = cart.map((x) => {
      return {
        food: db.get('foodList').find({ id: x.foodId }).value(),
        amount: x.amount
      }
    });
    
    res.render('products/index.ejs', {
      foodList: db.get('foodList').value(),
      user: "Toan",
      cart: cartMapped

    }); 
    return; 
  }

  res.render('products/index.ejs', {
    foodList: db.get('foodList').value(),
    cart: '',
    user: '',
  });
});

route.get('/products/cart', auth.user, (req, res) => {
  var id = req.cookies.userId;
  var cart = db.get('users').find({ id: id }).value().cart;
  var cartMapped = cart.map((x) => {
    return {
      food: db.get('foodList').find({ id: x.foodId }).value(),
      amount: x.amount
    }
  });
  res.render('products/cart.ejs', {
    cart: cartMapped,
    user: "Toan"
  });
});

route.get('/products/add-to-cart/:id', auth.user, (req, res) => {
  var id = req.params.id;
  var flag = false;
  var cart = db.get('users').find({ id: req.cookies.userId }).value().cart;
  for (var food of cart) {
    if (food.foodId === id) {
      food.amount++;
      flag = true;
      break;
    }
  }

  if (!flag) {
    cart.push({
      foodId: id,
      amount: 1
    });
  }

  db.get('users').find({ id: req.cookies.userId }).set('cart', cart).write();
  res.redirect('/');
});

route.get('/products/cart/delete/:id', (req, res) => {
  var id = req.params.id;
  var index = 0;
  var cart = db.get('users').find({ id: req.cookies.userId }).value().cart;
  for (var i in cart) {
    if (cart[i].foodId === id) {
      index = i; // i là string, index của array là STRING
      break;
    }
  }

  var cartDeleted = cart.slice(0, parseInt(index)).concat(cart.slice(parseInt(index) + 1, cart.length)); //?? dùng index + 1 
                                      //trong slide lần 2 lại ko đc
  db.get('users').find({ id: req.cookies.userId }).set('cart', cartDeleted).write();
  res.redirect('/products/cart');
});

module.exports = route;