var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var schemaAttestation = new Schema({
  merkle_root: String,
  txid: String,
  confirmed: Boolean,
  inserted_at: Date
}, { collection: 'Attestation' });

var schemaClientCommitment = new Schema({
  commitment: String,
  client_position: Number
}, { collection: 'ClientCommitment', versionKey: false });

var schemaClientDetails = new Schema({
  client_position: Number,
  auth_token: String,
  pubkey: String,
}, { collection: 'ClientDetails' });

var schemaMerkleCommitment = new Schema({
  commitment: String,
  merkle_root: String,
  client_position: Number
}, { collection: 'MerkleCommitment' });

var schemaMerkleProof = new Schema({
  client_position: Number,
  merkle_root: String,
  commitment: String,
  ops: [{ append: Boolean, commitment: String }]
}, { collection: 'MerkleProof' });

var attestation = mongoose.model('Attestation', schemaAttestation);
var clientCommitment = mongoose.model('ClientCommitment', schemaClientCommitment);
var clientDetails = mongoose.model('ClientDetails', schemaClientDetails);
var merkleCommitment = mongoose.model('MerkleCommitment', schemaMerkleCommitment);
var merkleProof = mongoose.model('MerkleProof', schemaMerkleProof);

module.exports.attestation = attestation;
module.exports.clientCommitment = clientCommitment;
module.exports.clientDetails = clientDetails;
module.exports.merkleCommitment = merkleCommitment;
module.exports.merkleProof = merkleProof;
