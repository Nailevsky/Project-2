require('dotenv').config()
const path = require('path')
const express = require('express')
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override') 
const morgan = require('morgan')

// PORT
const PORT = process.env.PORT || 3000

// DB connection, models, and seed data
const db = require('./models');

const listsCtrl = require('./controllers/lists');

// Create the Express app
const app = express();

// Configure the app to refresh the browser when nodemon restarts

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Configure the app (app.set)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware (app.use)

// Indicates where our static files are located
app.use(express.static('public'))
// Use the connect-livereload package to connect nodemon and livereload
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));
app.use(morgan('tiny')) // morgan is just a logger

app.get('/', function (req, res) {
    res.redirect('/lists');
});

app.get('/seed', function (req, res) {
    db.Tool.deleteMany({})
        .then(() => {
            return db.Tool.insertMany(db.seedTools);
        })
        .then((addedTools) => {
            console.log(`Added ${addedTools.length} tools`);
            res.json(addedTools);
        });
});

// This tells our app to look at the `controllers/tools.js` file 
// to handle all routes that begin with `localhost:3000/tools`
app.use('/lists', listsCtrl)

// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});

// app.listen lets our app know which port to run
app.listen(PORT, () => {
    console.log("André", PORT)
})