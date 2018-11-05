var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var schemaAttestation = new Schema({
  id: Number,
  txid: String,
  merkle_root: String
}, {collection: 'Attestation'});

var schemaLatestCommitment = new Schema({
  position: Number,
  commitment: String
}, {collection: 'LatestCommitment'});

var schemaMerkleCommitment = new Schema({
  merkle_root: String,
  position: Number,
  commitment: String
}, {collection: 'MerkleCommitment'});

var schemaMerkleProof = new Schema({
  merkle_root: String,
  position: Number,
  proof: String
}, {collection: 'MerkleProof'});

var attestation = mongoose.model('Attestation', schemaAttestation)
var latestCommitment = mongoose.model('LatestCommitment', schemaLatestCommitment)
var merkleCommitment = mongoose.model('MerkleCommitment', schemaMerkleCommitment)
var merkleProof = mongoose.model('MerkleProof', schemaMerkleProof)

module.exports.attestation = attestation
module.exports.latestCommitment = latestCommitment
module.exports.merkleCommitment = merkleCommitment
module.exports.merkleProof = merkleProof
