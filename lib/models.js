var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var schemaAttestation = new Schema({
  merkle_root: String,
  txid: String,
  confirmed: Boolean,
  inserted_at: Date
}, { collection: 'Attestation' });

var schemaLatestCommitment = new Schema({
  commitment: String,
  client_position: Number
}, { collection: 'LatestCommitment', versionKey: false });

var schemaMerkleCommitment = new Schema({
  commitment: String,
  merkle_root: String,
  position: Number
}, { collection: 'MerkleCommitment' });

var schemaMerkleProof = new Schema({
  client_position: Number,
  merkle_root: String,
  commitment: String,
  ops: [{ append: Boolean, commitment: String }]
}, { collection: 'MerkleProof' });

var attestation = mongoose.model('Attestation', schemaAttestation)
var latestCommitment = mongoose.model('LatestCommitment', schemaLatestCommitment)
var merkleCommitment = mongoose.model('MerkleCommitment', schemaMerkleCommitment)
var merkleProof = mongoose.model('MerkleProof', schemaMerkleProof)

module.exports.attestation = attestation
module.exports.latestCommitment = latestCommitment
module.exports.merkleCommitment = merkleCommitment
module.exports.merkleProof = merkleProof
