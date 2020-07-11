const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./db.js');

const port = 3001;

const cookRoute = require('./routes/cook.route.js');
const authMiddleWare = require('./middleware/auth.middleware.js');
const authRoute = require('./routes/auth.route.js');
const productRoute = require('./routes/products.route.js');

app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

/*	res.render('index.pug');
});*/

app.use('/', productRoute);
app.use('/cook', authMiddleWare.cook, cookRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));