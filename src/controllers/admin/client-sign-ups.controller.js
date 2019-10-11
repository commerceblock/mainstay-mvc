const elliptic = require('elliptic');

const models = require('../../models/models');
const ec = new elliptic.ec('secp256k1');

class ClientSignUpsController {

    async list(req, res, next) {
        try {
            const list = await models.clientSignup.find();
            res.json({data: list});
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ClientSignUpsController();
