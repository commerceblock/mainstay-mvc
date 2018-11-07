var express = require('express');
var mongoose = require('mongoose');
var api = require('./lib/controllers')
var app = express();
// MACRO
const API_INDEX = '/api/v1'
const API_LATEST_ATTESTATION = '/api/v1/latestattestation'
const API_LATEST_COMMITMENT = '/api/v1/latestcommitment'
const API_COMMITMENT_LATEST_PROOF = '/api/v1/commitment/latestproof'
const API_COMMITMENT_PROOF = '/api/v1/commitment/proof'
const API_COMMITMENT_SEND = '/api/v1/commitment/send'
const API_COMMITMENT_VERIFY = '/api/v1/commitment/verify'
// Connect to MongoBD
var dbConnect = 'mongodb://localhost/mainstay1'
mongoose.connect(dbConnect, (error) => {
  if (error) {
    console.log('Can\'t connect');
    exit();
  }
  console.log('Connected');
});
// Get Routes for METHOD GET
app.get(API_INDEX, api.index);
app.get(API_LATEST_ATTESTATION, api.latest_attestation);
app.get(API_LATEST_COMMITMENT, api.latest_commitment);
app.get(API_COMMITMENT_LATEST_PROOF, api.commitment_latest_proof);
app.get(API_COMMITMENT_VERIFY, api.commitment_verify);
app.get(API_COMMITMENT_PROOF, api.commitment_proof);
// Get Routes for METHOD POST
app.post(API_COMMITMENT_SEND, api.commitment_send);
// Main Listening port of the app
app.listen(9000);
