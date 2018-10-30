var api = require('./lib/controllers')
var express = require('express');
var app = express();
// MACRO
const API_INDEX = '/'
const API_LATEST_ATTESTATION = '/api/latestattestation'
const API_LATEST_COMMITMENT = '/api/latestcommitment'
const API_COMMITMENT_LATEST_PROOF = '/api/commitment/latestproof'
const API_COMMITMENT_PROOF = '/api/commitment/proof'
const API_COMMITMENT_SEND = '/api/commitment/send'
const API_COMMITMENT_VERIFY = '/api/commitment/verify'
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
