const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const schemaAttestation = new Schema({
    merkle_root: String,
    txid: String,
    confirmed: Boolean,
    inserted_at: Date
}, {collection: 'Attestation'});

const schemaAttestationInfo = new Schema({
    txid: String,
    amount: Number,
    blockhash: String,
    time: Number
}, {collection: 'AttestationInfo'});

const schemaClientCommitment = new Schema({
    commitment: String,
    client_position: Number
}, {collection: 'ClientCommitment', versionKey: false});

const schemaClientDetails = new Schema({
    client_position: Number,
    auth_token: String,
    pubkey: String,
    client_name: String,
}, {collection: 'ClientDetails'});

const schemaMerkleCommitment = new Schema({
    commitment: String,
    merkle_root: String,
    client_position: Number
}, {collection: 'MerkleCommitment'});

const schemaMerkleProof = new Schema({
    client_position: Number,
    merkle_root: String,
    commitment: String,
    ops: [{append: Boolean, commitment: String}]
}, {collection: 'MerkleProof'});

const attestation = mongoose.model('Attestation', schemaAttestation);
const attestationInfo = mongoose.model('AttestationInfo', schemaAttestationInfo);
const clientCommitment = mongoose.model('ClientCommitment', schemaClientCommitment);
const clientDetails = mongoose.model('ClientDetails', schemaClientDetails);
const merkleCommitment = mongoose.model('MerkleCommitment', schemaMerkleCommitment);
const merkleProof = mongoose.model('MerkleProof', schemaMerkleProof);

module.exports.attestation = attestation;
module.exports.attestationInfo = attestationInfo;
module.exports.clientCommitment = clientCommitment;
module.exports.clientDetails = clientDetails;
module.exports.merkleCommitment = merkleCommitment;
module.exports.merkleProof = merkleProof;
