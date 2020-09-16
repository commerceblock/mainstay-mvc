const uuidv4 = require('uuid/v4');
const EmailHelper = require('./email-helper');
const models = require('../models/models');

module.exports.create_slot  = async function create_slot(signup) {
    // fetch item with max client_position
    const maxPositionClientDetails = await models.clientDetails
        .findOne()
        .sort({client_position: -1})
        .limit(1);

    let nextClientPosition;
    if (maxPositionClientDetails === null) {
        nextClientPosition = 0;
    } else {
        nextClientPosition = maxPositionClientDetails.client_position + 1;
    }
    const publicKey = '';

    // service level can be one of: 'free', 'basic', 'intermediate' and 'enterprise'
    const level = signup.service_level;

    // create new client-detail
    const clientDetailsData = {
        client_position: nextClientPosition,
        auth_token: uuidv4(),
        client_name: `${signup.first_name} ${signup.last_name}`,
        pubkey: publicKey,
        service_level: level
    };
    const clientDetails = new models.clientDetails(clientDetailsData);
    await clientDetails.save();

    // create client-commitment
    const clientCommitmentData = {
        client_position: clientDetails.client_position,
        commitment: '0000000000000000000000000000000000000000000000000000000000000000'
    };
    const clientCommitment = new models.clientCommitment(clientCommitmentData);
    await clientCommitment.save();

    signup.status = 'slot_ok';
    await signup.save();

    await EmailHelper.sendPaymentOkEmail(signup, clientCommitment, clientDetails);
};

