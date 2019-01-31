const controllers = require('../controllers/controllers');

const CTRL = '/ctrl'

function ctrl_get(app) {
  app.get(CTRL + '/latestattestation', controllers.ctrl_latest_attestation);
  app.get(CTRL + '/latestattestationinfo', controllers.ctrl_latest_attestation_info);
  app.get(CTRL + '/latestcommitment', controllers.ctrl_latest_commitment);

  app.get(CTRL + '/type', controllers.ctrl_type);
}

function ctrl_post(app) {
  app.post(CTRL + '/sendcommitment', controllers.ctrl_send_commitment);
}

function ctrl(app) {
  ctrl_get(app);
  ctrl_post(app);
}

module.exports.ctrl = ctrl;
