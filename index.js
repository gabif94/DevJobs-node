const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const router = require('./routes');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config({path: 'variables.env'});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'layout',
		helpers: require('./helpers/handlebars'),
	})
);

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(
	session({
		secret: process.env.SECRETO,
		key: process.env.KEY,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE,
		}),
	})
);

app.use('/', router());

app.listen(process.env.PUERTO);
