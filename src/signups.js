#!/usr/bin/env node
const mongoose = require('mongoose');
const env = require('../src/env');
const models = require('../src/models/models');

function connect_mongo() {
    let url = 'mongodb://';
    if (env.db.user && env.db.password) {
        url += env.db.user + ':' + env.db.password;
    }
    url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
    mongoose.connect(url, {useNewUrlParser: true});
    return mongoose.connection;
}

function do_work() {
    const db = connect_mongo();
    mongoose.set('debug', true);
    db.on('disconnected', function (ref) {
        console.log('Connection with database lost');
        process.exit(1);
    });
    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', () => {
        console.log("Signups service running...")
    });
}

do_work();
