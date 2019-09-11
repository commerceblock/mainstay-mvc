const express = require('express');
const jwt = require('jsonwebtoken');

const api_controller = require('./controllers/api_controller');
const ctrl_controller = require('./controllers/ctrl_controller');
const admin_controller = require('./controllers/admin-controller');

const {jwt: {secret: jwtSecret}} = require('./env');

function makeApiRoutes (app) {
    const router = express.Router();

    router.get('/', api_controller.index);
    router.get('/latestattestation', api_controller.latest_attestation);
    router.get('/latestcommitment', api_controller.latest_commitment);
    router.get('/commitment', api_controller.commitment);
    router.get('/commitment/latestproof', api_controller.commitment_latest_proof);
    router.get('/commitment/verify', api_controller.commitment_verify);
    router.get('/commitment/proof', api_controller.commitment_proof);
    router.get('/commitment/commitment', api_controller.commitment_commitment);
    router.get('/merkleroot', api_controller.merkleroot);
    router.get('/position', api_controller.position);
    router.get('/attestation', api_controller.attestation);
    router.get('/blockhash', api_controller.blockhash);
    router.get('/clients', api_controller.clients);
    router.post('/commitment/send', api_controller.commitment_send);

    app.use('/api/v1', router);
}

function makeCtrlRoutes (app) {
    const router = express.Router();

    // for parsing application/json
    router.use(express.json());
    // for parsing application/x-www-form-urlencoded
    router.use(express.urlencoded({extended: true}));

    router.get('/latestattestation', ctrl_controller.ctrl_latest_attestation);
    router.get('/latestattestationinfo', ctrl_controller.ctrl_latest_attestation_info);
    router.get('/latestcommitment', ctrl_controller.ctrl_latest_commitment);

    router.get('/type', ctrl_controller.ctrl_type);

    router.post('/sendcommitment', ctrl_controller.ctrl_send_commitment);
    router.post('/usersignup', ctrl_controller.ctrl_client_signup);

    // error handler middleware
    router.use((error, req, res, next) => {
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

    app.use('/ctrl', router);
}

function makeAdminRoutes (app) {
    const router = express.Router();

    // for parsing application/json
    router.use(express.json());
    // for parsing application/x-www-form-urlencoded
    router.use(express.urlencoded({extended: true}));

    router.post('/login', admin_controller.login);

    // middleware to check access-token
    router.use((req, res, next) => {
        const accessToken = req.headers['access-token'];
        if (!accessToken) {
            return res.status(401).end();
        }
        jwt.verify(accessToken, jwtSecret, function (error, payloadIgnored) {
            if (error) {
                console.error(error);
                return res.status(401).end();
            } else {
                next();
            }
        });
    });

    router.get('/client_details', admin_controller.client_details);
    router.post('/client_details', admin_controller.add_client_details);

    // error handler middleware
    router.use((error, req, res, next) => {
        if (error.status_code) {
            res.status(400).json({
                error: {
                    code: error.status_code,
                    message: error.message
                }
            });
        } else {
            res.status(500).json({
                error: {
                    code: 'something_wrong',
                    message: error.message
                },
            });
        }
    });

    app.use('/suadmin', router);
}

module.exports = {
    makeCtrlRoutes,
    makeApiRoutes,
    makeAdminRoutes,
};
