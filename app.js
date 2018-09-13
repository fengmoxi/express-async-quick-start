const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const boom = require('boom');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 跨域
app.use(cors({
    origin: ['http://domain'],
    methods: ['POST']
}));

// set X-Powered-By
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'express-async-quick-start');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(boom.notFound(''));
});

// error handler
app.use(function (err, req, res, next) {
    const errDetail = err.output;
    res.status(errDetail.statusCode).jsonp({"errMsg": err.message});
});

module.exports = app;
