#!/usr/bin/env node
const express = require('express');
const env = require('../src/env');
const mongoose = require('mongoose');
const app = express();
//const mainstay_websocket = require('./websocket/mainstay_websocket').mainstay_websocket;

const api = require('./routes/api').api;
const ctrl = require('./routes/ctrl').ctrl;

u
const ERROR = 'error';
const OPEN = 'open';

function connect_mongo() {
  let url = 'mongodb://';
  if (env.db.user && env.db.password)
    url += env.db.user + ':' + env.db.password;
  url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
  mongoose.connect(url, { useNewUrlParser: true });
  return mongoose.connection;
}

function __MAIN__() {
  let db = connect_mongo();
  db.on(ERROR, console.error.bind(console, 'Connection Error:'));
  db.once(OPEN, () => {
    // mainstay_websocket();
    api(app);
    ctrl(app);
    app.get('*', (req, res) => {
      res.status(404).send('404 Not Found');
    });
    app.listen(env.server.port || 80);
  });
}

__MAIN__();
