/*
*   Lots of imports
*/


import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

// Crud operations functions
import CrudOperations from "./crud";
// Routes for crud operations
import router from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
// session keeps track if user is authenticated or not
app.use(session({secret: 'example', resave: false, saveUninitialized: true}));
app.use(bodyParser());
// use the api routes specified in routes.js
app.use('/api', router);
// serve the react code for the frontend off of this extension
app.use('/bundledJs', express.static(__dirname + '/dist/js'));

let userPermissions;

// If the current user hasn't logged in we want to block them from accessing the
// user page where all of our functionality is
function checkAuth(req, res, next) {
    if (req.url === '/user' && (!req.session || !req.session.authenticated)) {
        res.send('unauthorized please sign in', {status: 403});
        return;
    }
    next();
}

// we want all users to log into the system first
// so going to "localhost:8080" will just redirect them 
// to "localhost:8080/login"
app.get('/', (req, res, next) => {
    res.redirect('/login');
});

// This route sends the user the "user.html" file
// which will render the app for them. We add the
// "checkAuth" function to make sure this user's session
// has been authenticated before sending them the file
app.get('/user', checkAuth, (req, res, next) => {
    res.sendFile('dist/user.html', {root: __dirname});
});

// Send the user the index.html file, which contains the login form,
// when they go to "localhost:8080/login"
app.get('/login', (req, res, next) => {
    res.sendFile('dist/index.html', {root: __dirname});
});

// Handles the login post request
app.post('/login', (req, res, next) => {
    // the loginUser function returns a promise containing the data
    // from the database.
    let userQuery = CrudOperations.loginUser(req.body.username, req.body.password);
    userQuery.exec((err, user) => {
        // "user" is an array, if the length is one
        // then the user exists in our database
        if (user.length === 1) {
            // set the user's session to authenticated
            req.session.authenticated = true;
            userPermissions = user[0].permissions;
            // redirect the user to "localhost:8080/user"
            res.redirect('/user');
        } else {
            // user credentials wrong, send them back to the 
            // login page
            res.redirect('/login');
        }
    });
});

app.get('/permissions', (req, res, next) => {
    res.send({permissions: userPermissions});
});

// Handles the logout route. All we need to do
// is delete the user's authentication and redirect them
// to the home route "localhost:8080"
app.get('/logout', (req, res, next) => {
    delete req.session.authenticated;
    res.redirect('/');
});

// This connects our server to the Zoo database residing
// in Mongodb
mongoose.connect('mongodb://localhost/zoo', (err, res) => {
    if (err) {
        console.log('[-] Unable to connect to Mongo, did you turn it on with sudo service mongodb start?');
    } else {
        console.log('[+] Connected to Mongodb Zoo database');
    }
});

// have the server listen on localhost:8080
app.listen(8080);
console.log("[+] Server running on port 8080...");
