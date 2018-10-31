var mongoose = require('mongoose');

var schemaAttestation = new mongoose.Schema({
  id: Number,
  txid: String,
  markle_root: String
});

var schemaLatestCommitment = new mongoose.Schema({
  position: Number,
  commitment: String
});

var schemaMerkleCommitment = new mongoose.Schema({
  merkle_root: String,
  position: Number,
  commitment: String
});

var schemaMerkleProof = new mongoose.Schema({
  merkle_root: String,
  position: Number,
  proof: String
});

mongoose.model('Attestation', schemaAttestation)
mongoose.model('LatestCommitment', schemaLatestCommitment)
mongoose.model('MerkleCommitment', schemaMerkleCommitment)
mongoose.model('MerkleProof', schemaMerkleProof)
