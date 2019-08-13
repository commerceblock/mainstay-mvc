const os = require('os');
const multer = require('multer');
const upload = multer({dest: `${os.tmpdir()}/mainstayx`, limits: {fileSize: 10 * 1024 * 1024}});

const api_controller = require('./controllers/api_controller');
const ctrl_controller = require('./controllers/ctrl_controller');

const API = '/api/v1';
const CTRL = '/ctrl';

function api(app) {
    app.get(API + '/', api_controller.index);
    app.get(API + '/latestattestation', api_controller.latest_attestation);
    app.get(API + '/latestcommitment', api_controller.latest_commitment);
    app.get(API + '/commitment', api_controller.commitment);
    app.get(API + '/commitment/latestproof', api_controller.commitment_latest_proof);
    app.get(API + '/commitment/verify', api_controller.commitment_verify);
    app.get(API + '/commitment/proof', api_controller.commitment_proof);

    app.get(API + '/commitment/commitment', api_controller.commitment_commitment);
    app.get(API + '/merkleroot', api_controller.merkleroot);
    app.get(API + '/position', api_controller.position);
    app.get(API + '/attestation', api_controller.attestation);
    app.get(API + '/blockhash', api_controller.blockhash);

    app.get(API + '/clients', api_controller.clients);

    app.post(API + '/commitment/send', api_controller.commitment_send);
}

function ctrl(app) {
    app.get(CTRL + '/latestattestation', ctrl_controller.ctrl_latest_attestation);
    app.get(CTRL + '/latestattestationinfo', ctrl_controller.ctrl_latest_attestation_info);
    app.get(CTRL + '/latestcommitment', ctrl_controller.ctrl_latest_commitment);

    app.get(CTRL + '/type', ctrl_controller.ctrl_type);

    app.post(CTRL + '/sendcommitment', ctrl_controller.ctrl_send_commitment);
    app.post(CTRL + '/usersignup', upload.single('image'), ctrl_controller.ctrl_client_signup);
    app.use((error, req, res, next) => {
        if (error.code) {
            res.status(400).json({error: error.code, message: error.message})
        } else {
            res.status(500).json({error: 'api', message: error.message})
        }
    });
}

module.exports = {
    ctrl,
    api
};