#!/usr/bin/env node
const express = require('express');
const env = require('../src/env');
const mongoose = require('mongoose');
const api = require('./controllers/controllers');
const app = express();
const mainstay_websocket = require('./websocket/mainstay_websocket').mainstay_websocket;

const API_INDEX = '/api/v1'
const API_LATEST_ATTESTATION = '/api/v1/latestattestation'
const API_ATTESTATION = '/api/v1/attestation'
const API_LATEST_COMMITMENT = '/api/v1/latestcommitment'
const API_COMMITMENT = '/api/v1/commitment'
const API_COMMITMENT_LATEST_PROOF = '/api/v1/commitment/latestproof'
const API_COMMITMENT_PROOF = '/api/v1/commitment/proof'
const API_COMMITMENT_SEND = '/api/v1/commitment/send'
const API_COMMITMENT_VERIFY = '/api/v1/commitment/verify'
const CTRL_LATEST_ATTESTATION = '/ctrl/latestattestation'
const CTRL_LATEST_ATTESTATION_INFO = '/ctrl/latestattestationinfo'
const CTRL_LATEST_COMMITMENT = '/ctrl/latestcommitment'
const CTRL_SEND_COMMITMENT = '/ctrl/sendcommitment'

function routes_api_get(app) {
  app.get(API_INDEX, api.index);
  app.get(API_LATEST_ATTESTATION, api.latest_attestation);
  app.get(API_ATTESTATION, api.attestation);
  app.get(API_LATEST_COMMITMENT, api.latest_commitment);
  app.get(API_COMMITMENT, api.commitment);
  app.get(API_COMMITMENT_LATEST_PROOF, api.commitment_latest_proof);
  app.get(API_COMMITMENT_VERIFY, api.commitment_verify);
  app.get(API_COMMITMENT_PROOF, api.commitment_proof);
}

function routes_api_post(app) {
  app.post(API_COMMITMENT_SEND, api.commitment_send);
}

function routes_spetial(app) {
  app.get('*', (req, res) => { res.status(404).send('404 Not Found'); });
}

function routes_view_get(app) {
  app.get(CTRL_LATEST_ATTESTATION, api.ctrl_latest_attestation);
  app.get(CTRL_LATEST_ATTESTATION_INFO, api.ctrl_latest_attestation_info);
  app.get(CTRL_LATEST_COMMITMENT, api.ctrl_latest_commitment);
}

function routes_view_post(app) {
  app.post(CTRL_SEND_COMMITMENT, api.ctrl_send_commitment);
}

function connect_mongo() {
  let url = 'mongodb://';
  if (env.db.user && env.db.password)
    url += env.db.user + ':' + env.db.password
  url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
  mongoose.connect(url, { useNewUrlParser: true });
  return mongoose.connection;
}

function __MAIN__() {
  let db = connect_mongo();
  db.on('error', console.error.bind(console, 'Connection Error:'));
  db.once('open', () => {
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    mainstay_websocket();
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    routes_api_get(app);
    routes_view_get(app);
    routes_spetial(app);
    routes_api_post(app);
    routes_view_post(app);
    app.listen(env.server.port || 80);
  });
}

__MAIN__();
