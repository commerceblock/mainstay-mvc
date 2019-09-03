const express = require('express');
const api_controller = require('./controllers/api_controller');
const ctrl_controller = require('./controllers/ctrl_controller');

function makeApiRoutes (app) {
    const apiRouter = express.Router();

    apiRouter.get('/', api_controller.index);
    apiRouter.get('/latestattestation', api_controller.latest_attestation);
    apiRouter.get('/latestcommitment', api_controller.latest_commitment);
    apiRouter.get('/commitment', api_controller.commitment);
    apiRouter.get('/commitment/latestproof', api_controller.commitment_latest_proof);
    apiRouter.get('/commitment/verify', api_controller.commitment_verify);
    apiRouter.get('/commitment/proof', api_controller.commitment_proof);
    apiRouter.get('/commitment/commitment', api_controller.commitment_commitment);
    apiRouter.get('/merkleroot', api_controller.merkleroot);
    apiRouter.get('/position', api_controller.position);
    apiRouter.get('/attestation', api_controller.attestation);
    apiRouter.get('/blockhash', api_controller.blockhash);
    apiRouter.get('/clients', api_controller.clients);
    apiRouter.post('/commitment/send', api_controller.commitment_send);

    app.use('/api/v1', apiRouter);
}

function makeCtrlRoutes (app) {
    const ctrlRouter = express.Router();

    // for parsing application/json
    ctrlRouter.use(express.json());
    // for parsing application/x-www-form-urlencoded
    ctrlRouter.use(express.urlencoded({extended: true}));

    ctrlRouter.get('/latestattestation', ctrl_controller.ctrl_latest_attestation);
    ctrlRouter.get('/latestattestationinfo', ctrl_controller.ctrl_latest_attestation_info);
    ctrlRouter.get('/latestcommitment', ctrl_controller.ctrl_latest_commitment);

    ctrlRouter.get('/type', ctrl_controller.ctrl_type);

    ctrlRouter.post('/sendcommitment', ctrl_controller.ctrl_send_commitment);
    ctrlRouter.post('/usersignup', ctrl_controller.ctrl_client_signup);

    // error handler middleware
    ctrlRouter.use((error, req, res, next) => {
        if (error.code) {
            res.status(400).json({
                error: error.code,
                message: error.message
            });
        } else {
            res.status(500).json({
                error: 'api',
                message: error.message
            });
        }
    });

    app.use('/ctrl', ctrlRouter);
}

module.exports = {
    makeCtrlRoutes,
    makeApiRoutes
};
