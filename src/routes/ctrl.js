const controllers = require('../controllers/controllers');

const CTRL_LATEST_ATTESTATION = '/ctrl/latestattestation';
const CTRL_LATEST_ATTESTATION_INFO = '/ctrl/latestattestationinfo';
const CTRL_LATEST_COMMITMENT = '/ctrl/latestcommitment';
const CTRL_SEND_COMMITMENT = '/ctrl/sendcommitment';

function ctrl_get(app) {
  app.get(CTRL_LATEST_ATTESTATION, controllers.ctrl_latest_attestation);
  app.get(CTRL_LATEST_ATTESTATION_INFO, controllers.ctrl_latest_attestation_info);
  app.get(CTRL_LATEST_COMMITMENT, controllers.ctrl_latest_commitment);
}

function ctrl_post(app) {
  app.post(CTRL_SEND_COMMITMENT, controllers.ctrl_send_commitment);
}

function ctrl(app) {
  ctrl_get(app);
  ctrl_post(app);
}

module.exports.ctrl = ctrl;
