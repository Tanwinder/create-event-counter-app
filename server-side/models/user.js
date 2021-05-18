const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const User = new Schema({
    firstName: { type: String, required:  true },
    lastName: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
})

module.exports = model("Users", User);
