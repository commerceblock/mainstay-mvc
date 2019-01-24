const controllers = require('../controllers/controllers');

const API = '/api/v1'

function api_get(app) {
  app.get(API + '/', controllers.index);
  app.get(API + '/latestattestation', controllers.latest_attestation);
  app.get(API + '/latestcommitment', controllers.latest_commitment);
  app.get(API + '/commitment', controllers.commitment);
  app.get(API + '/commitment/latestproof', controllers.commitment_latest_proof);
  app.get(API + '/commitment/verify', controllers.commitment_verify);
  app.get(API + '/commitment/proof', controllers.commitment_proof);

  app.get(API + '/commitment/commitment', controllers.commitment_commitment);
  app.get(API + '/merkleroot', controllers.merkleroot);
  app.get(API + '/position', controllers.position);
  app.get(API + '/attestation', controllers.attestation);
  app.get(API + '/blockhash', controllers.blockhash);
}

function api_post(app) {
  app.post(API + '/commitment/send', controllers.commitment_send);
}

function api(app) {
  api_get(app);
  api_post(app);
}

module.exports.api = api;
