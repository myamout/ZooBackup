var mongoose = require('mongoose');
var User = require('../models/user');

mongoose.connect('mongodb://localhost/zoo', (err, res) => {
    if (err) {
        console.log('[-] Unable to connect to Mongo, did you turn it on with sudo service mongodb start?');
    } else {
        console.log('[+] Connected to Mongodb Zoo database');
    }
});

mongoose.connection.db.listCollections({name: 'users'})
    .next((err, response) => {
        if (response) {
            mongoose.connection.db.dropCollection('users', (err, response) => {
                if (err) { console.log(err)}
                else { console.log('Previously created users collection dropped')}
            });
        }
    });

var seedUser = new User({
    username: 'admin',
    password: 'pass',
    permissions: 1
});

seedUser.save(function (err, response) {
    if (err) {
        console.log(err);
        mongoose.connection.close();
    }
    console.log('[+] MongoDB seeded with admin user -> credentials username: admin password: pass');
    mongoose.connection.close();
});
