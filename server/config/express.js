/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    // Add headers
    app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Authorization', 'http://localhost:4200')
      // Request methods you wish to allow res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');


      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
});
    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'dist', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'dist')));
        app.set('appPath', path.join(config.root, 'dist'));

        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.set('appPath', path.join(config.root, 'dist'));
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};
