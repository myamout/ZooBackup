// This file basically defines our Animal object and its
// fields. This model allows for easy use inside of the 
// mongo database

import mongoose from "mongoose";

let Schema = mongoose.Schema;

const Animal = new Schema({
    name: {
        type: String,
        required: true
    },
    identification: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    health: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Animal', Animal, 'animals');
