    // modules =================================================
    var express = require('express');
    var mongoose = require('mongoose');

    var path = require('path');
    var favicon = require('static-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var database = require('./config/db');            // load the database config
    var port = process.env.PORT || 8080; // set our port
    
    var app = express();

    // configuration ===========================================
        
    // config files
    // var db = require('./data/db')
    mongoose.connect(database.url); 

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connect to mongo");    
    });

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());


    // routes ==================================================
    // APIs routes    
    require('./back_end/routes')(app); // configure our routes
        

/// error handlers

// /// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

    // start app ========================================
    app.listen(port);
    console.log("on port " + port);
    module.exports = app;

