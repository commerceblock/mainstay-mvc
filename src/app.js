#!/usr/bin/env node
const express = require('express');
const env = require('../src/env');
const mongoose = require('mongoose');
const app = express();
//const mainstay_websocket = require('./websocket/mainstay_websocket').mainstay_websocket;

const routes = require('./routes');

function connect_mongo() {
    let url = 'mongodb://';
    if (env.db.user && env.db.password) {
        url += env.db.user + ':' + env.db.password;
    }
    url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
    mongoose.connect(url, {useNewUrlParser: true});
    return mongoose.connection;
}

function __MAIN__() {
    const db = connect_mongo();

    mongoose.set('debug', function (coll, method, query, doc) {
        console.log(coll, query);
    });

    mongoose.connection.on('disconnected', function(ref) {
        console.log("Connection with database lost");
        process.exit(1);
    });
    
    mongoose.connection.on('error', function (err) {
        if (err) console.log(err);
    });

    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', () => {
        // mainstay_websocket();
        routes.api(app);
        routes.ctrl(app);

        app.get('*', (req, res) => {
            res.status(404).send('404 Not Found');
        });
        app.listen(env.server.port || 80, () => {
            console.log(`Server started on port ${env.server.port || 80}`);
        });
    });
}

__MAIN__();
