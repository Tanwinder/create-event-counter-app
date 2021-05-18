// const express = require('express');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const EventUl = new Schema({
    title: String,
    message: {
        type: String,
        default: "testing project"
    },
    creator: {
        type: String,
        required: true
    },
    creatorEmail: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: ["#Vball", "#BBall"]
    },
    selectedFile: {
        type: String,
        default: ""
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    expiredAt: {
        type: Date,
        default: new Date(),
    },
    place: {
        type: String,
        default: "Chantilly"
    }
})

module.exports = model('Events', EventUl);