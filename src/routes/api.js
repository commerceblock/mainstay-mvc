const controllers = require('../controllers/controllers');

const API_INDEX = '/api/v1';
const API_LATEST_ATTESTATION = '/api/v1/latestattestation';
const API_ATTESTATION = '/api/v1/attestation';
const API_LATEST_COMMITMENT = '/api/v1/latestcommitment';
const API_COMMITMENT = '/api/v1/commitment';
const API_COMMITMENT_LATEST_PROOF = '/api/v1/commitment/latestproof';
const API_COMMITMENT_PROOF = '/api/v1/commitment/proof';
const API_COMMITMENT_SEND = '/api/v1/commitment/send';
const API_COMMITMENT_VERIFY = '/api/v1/commitment/verify';


const API_TYPE = '/api/v1/type';




function api_get(app) {
  app.get(API_INDEX, controllers.index);
  app.get(API_LATEST_ATTESTATION, controllers.latest_attestation);
  app.get(API_ATTESTATION, controllers.attestation);
  app.get(API_LATEST_COMMITMENT, controllers.latest_commitment);
  app.get(API_COMMITMENT, controllers.commitment);
  app.get(API_COMMITMENT_LATEST_PROOF, controllers.commitment_latest_proof);
  app.get(API_COMMITMENT_VERIFY, controllers.commitment_verify);
  app.get(API_COMMITMENT_PROOF, controllers.commitment_proof);


  app.get(API_TYPE, controllers.type);

}

function api_post(app) {
  app.post(API_COMMITMENT_SEND, controllers.commitment_send);
}

function api(app) {
  api_get(app);
  api_post(app);
}

module.exports.api = api;
