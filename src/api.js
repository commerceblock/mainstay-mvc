var express = require('express');
var env = require('../src/env');
var mongoose = require('mongoose');
var api = require('../src/controllers/controllers');
var app = express();
// MACRO
const API_INDEX = '/api/v1'
const API_LATEST_ATTESTATION = '/api/v1/latestattestation'
const API_ATTESTATION = '/api/v1/attestation'
const API_LATEST_COMMITMENT = '/api/v1/latestcommitment'
const API_COMMITMENT = '/api/v1/commitment'
const API_COMMITMENT_LATEST_PROOF = '/api/v1/commitment/latestproof'
const API_COMMITMENT_PROOF = '/api/v1/commitment/proof'
const API_COMMITMENT_SEND = '/api/v1/commitment/send'
const API_COMMITMENT_VERIFY = '/api/v1/commitment/verify'
// Connect to MongoBD
let dbConnect = 'mongodb://';

if (env.db.user && env.db.password)
    dbConnect += env.db.user + ':' + env.db.password

dbConnect = dbConnect + '@' + env.db.address;
dbConnect = dbConnect + ':' + env.db.port;
dbConnect = dbConnect + '/' + env.db.database;

mongoose.connect(dbConnect, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log('\033[1;31mCan\'t connect\033[0m');
    exit();
  }
  console.log('\033[0;32mConnected.\033[0m');
});
// Get Routes for METHOD GET
app.get(API_INDEX, api.index);
app.get(API_LATEST_ATTESTATION, api.latest_attestation);
app.get(API_ATTESTATION, api.attestation);
app.get(API_LATEST_COMMITMENT, api.latest_commitment);
app.get(API_COMMITMENT, api.commitment);
app.get(API_COMMITMENT_LATEST_PROOF, api.commitment_latest_proof);
app.get(API_COMMITMENT_VERIFY, api.commitment_verify);
app.get(API_COMMITMENT_PROOF, api.commitment_proof);
// Get Routes for METHOD POST
app.post(API_COMMITMENT_SEND, api.commitment_send);

app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
})
// Main Listening port of the app
app.listen(env.server.port || 8080);
