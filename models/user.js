import mongoose from "mongoose";

let Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', User, 'users');
