const elliptic = require('elliptic');

const models = require('../../models/models');
const ec = new elliptic.ec('secp256k1');

class ClientSignUpController {

    async list(req, res, next) {
        try {
            const list = await models.clientSignup.find().lean(true);
            res.json({
                data: {
                    clientSignups: list,
                    statuses: models.clientSignupStatuses
                }
            });
        } catch (error) {
            next(error);
        }
    };

    async patch(req, res, next) {
        const {id} = req.params;
        const {status} = req.body;

        if (!models.clientSignupStatuses.includes(status)) {
            return res.status(406).json({
                error: {
                    code: 'wrong_params',
                    message: 'Wrong status provided.'
                }
            });
        }

        try {
            const clientSignup = await models.clientSignup.findOne({_id: id});

            if (!clientSignup) {
                return res.status(404).json({
                    error: {
                        code: 'not_found',
                        message: error.message
                    }
                });
            }
            clientSignup.status = status;
            await clientSignup.save();
            res.json({
                data: clientSignup.toJSON()
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ClientSignUpController();
