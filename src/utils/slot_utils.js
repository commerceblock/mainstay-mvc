const uuidv4 = require('uuid/v4');
const models = require('../models/models');

module.exports.create_slot_with_token  = async function create_slot_with_token(expiry_date) {
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

    // create new client-detail
    const clientDetailsData = {
        client_position: nextClientPosition,
        auth_token: uuidv4(),
        pubkey: publicKey,
        expiry_date: expiry_date
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

    return clientDetailsData;
};

module.exports.update_slot_with_token  = async function update_slot_with_token(slot_id, expiry_date) {
    const clientDetailsData = await models.clientDetails.findOne({client_position: slot_id});
    clientDetailsData.expiry_date = expiry_date;
    await clientDetailsData.save();

    return clientDetailsData;
}