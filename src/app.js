var express = require("express");
var path = require('path');
const body = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
//const db = require("./middleware/db");


var indexRouter = require('./routes/index');
var accueilRouter = require('./routes/accueil');
var extractionRouter = require('./routes/extraction');
var modelRouter = require('./routes/model');
var chatRouter = require('./routes/chat');
var associationRouter = require('./routes/association');
var projectRouter = require('./routes/project');
var editeurRouter = require('./routes/editeur');
var userRouter = require('./routes/account');
var registerRouter = require('./routes/register');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(morgan("dev"));
//app.use(db);
app.use(express.json());
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(session({ secret: 'editor' }));
app.use(require("./middleware/flash"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, '../', "bower_components")));
app.use(session({
    secret: 'sorce2onto',
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/extraction', extractionRouter);
app.use('/model', modelRouter);
app.use('/chat', chatRouter);
app.use('/association', associationRouter);
app.use('/project', projectRouter);
app.use('/editeur', editeurRouter);
app.use('/user', userRouter);
app.use('/registration', registerRouter);
app.use('/accueil', accueilRouter);

//catch 404 notfound
app.use((req, res, next) => {
    console.log("Page not found");
    let err = new Error("Resource not found");
    err.status = 404;
    next(err);
});

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

//catch error
app.use((e, req, res, next) => {
    let status = e.status || 500;
    req.flash("error", e.message);
    console.log(e);
    next();
});

module.exports = app;