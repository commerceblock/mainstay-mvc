/* eslint-disable indent */
const assert = require('assert');
const mockHttp = require('node-mocks-http');
const mongoose = require('mongoose');
const controllers = require('../src/controllers/api_controller');
const ctrlControllers = require('../src/controllers/ctrl_controller');
const models = require('../src/models/models');
const { BAD_COMMITMENT } = require('../src/utils/constants');
////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoBD fot Test                                              ///
////////////////////////////////////////////////////////////////////////////////
const dbConnect = 'mongodb://localhost:27017/mainstayX';

beforeAll(async () => {
    await mongoose.connect(dbConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    const testDataMerkleCommitment = [
        {
            commitment: '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7',
            merkle_root: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090',
            client_position: 0
        }
    ];
    await models.merkleCommitment.insertMany(testDataMerkleCommitment);

    const testDataAttestaion = [
        {
            merkle_root: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090',
            txid: '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e',
            confirmed: true
        },
    ];
    await models.attestation.insertMany(testDataAttestaion);

    const testDataMerkleProof = [
        {
            client_position: 0,
            merkle_root: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090',
            commitment: '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7',
            ops: [
                {
                    append: true,
                    commitment: '2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f37f48ada3b7'
                },
                {
                    append: true,
                    commitment: '91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47'
                }
            ]
        }
    ];
    await models.merkleProof.insertMany(testDataMerkleProof);

    const testDataClientCommitment = [
        {
            commitment: '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7',
            client_position: 0
        }
    ];
    await models.clientCommitment.insertMany(testDataClientCommitment);

    const testDataClientDetails = [
        {
            client_position: 0,
            expiry_date: new Date('2025-12-31T23:59:59Z')
        }
    ];
    await models.clientDetails.insertMany(testDataClientDetails);

    const testDataTokenDetails = [
        {
            token_id: 'e1fb930a-23ed-4e0e-abb5-2ada8fe77e8a',
            value: 10000,
            confirmed: true,
            amount: 10000
        }
    ];
    await models.tokenDetails.insertMany(testDataTokenDetails);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Test Api Controllers', () => {
    //////////////////////////////////////////////////////////////////////////////
    /// Test                                                                   ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1'});
        const res = mockHttp.createResponse();
        controllers.index(req, res);
        assert(JSON.parse(res._getData()).response === 'Mainstay-API-v1');
    });
    //////////////////////////////////////////////////////////////////////////////
    /// Test Latest Attestation                                                ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1/latestattestation', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestattestation'});
        const res = mockHttp.createResponse();
        await controllers.latest_attestation(req, res);
        const json = JSON.parse(res._getData());
        const merkle_root = '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090';
        const txid = '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e';
        assert(json.response.merkle_root === merkle_root);
        assert(json.response.txid === txid);
    });
    //////////////////////////////////////////////////////////////////////////////
    /// Test Latest Commitment                                                 ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1/latestcommitment?position=0', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment?position=0'});
        const res = mockHttp.createResponse();
        await controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.response.commitment === '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
        assert(json.response.merkle_root === '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
        assert(json.response.txid === '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e');
    });
    it('Route: /api/v1/latestcommitment?position=1', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment?position=3'});
        const res = mockHttp.createResponse();
        await controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'your position is unknown to us');
    });
    it('Route: /api/v1/latestcommitment?position=', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment?position='});
        const res = mockHttp.createResponse();
        controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'position expects a int');
    });
    it('Route: /api/v1/latestcommitment?position', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment?position'});
        const res = mockHttp.createResponse();
        controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'position expects a int');
    });
    it('Route: /api/v1/latestcommitment?', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment?'});
        const res = mockHttp.createResponse();
        controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'missing position parameter');
    });
    it('Route: /api/v1/latestcommitment', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/latestcommitment'});
        const res = mockHttp.createResponse();
        controllers.latest_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'missing position parameter');
    });
    //////////////////////////////////////////////////////////////////////////////
    /// Test Commitment Latest Proof                                           ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1/commitment/latestproof?position=0', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof?position=0'});
        const res = mockHttp.createResponse();
        await controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.response.commitment === '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
        assert(json.response.merkle_root === '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    });
    it('Route: /api/v1/commitment/latestproof?position=1', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof?position=35'});
        const res = mockHttp.createResponse();
        await controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'your position is unknown to us');
    });
    it('Route: /api/v1/commitment/latestproof?position=', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof?position='});
        const res = mockHttp.createResponse();
        controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'position expects a int');
    });
    it('Route: /api/v1/commitment/latestproof?position', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof?position'});
        const res = mockHttp.createResponse();
        controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'position expects a int');
    });
    it('Route: /api/v1/commitment/latestproof?', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof?'});
        const res = mockHttp.createResponse();
        controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'missing position parameter');
    });
    it('Route: /api/v1/commitment/latestproof', () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/commitment/latestproof'});
        const res = mockHttp.createResponse();
        controllers.commitment_latest_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'missing position parameter');
    });
    //////////////////////////////////////////////////////////////////////////////
    /// Test Commitment Proof                                                  ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1/commitment/proof?position=0&merkle_root=7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090', async () => {
        const merkle_root = '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090';
        const position = 0;
        const req = mockHttp.createRequest({
            method: 'GET',
            url: `/api/v1/commitment/proof?position=${position}&merkle_root=${merkle_root}`
        });
        const res = mockHttp.createResponse();
        await controllers.commitment_proof(req, res);
        const json = JSON.parse(res._getData());
        assert(json.response.merkle_root === '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
        assert(json.response.commitment === '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
    });
    ///
    /// Add Test ... I'm too lazy to write these nuts test
    ///
    //////////////////////////////////////////////////////////////////////////////
    /// Test Commitment Verify                                                 ///
    //////////////////////////////////////////////////////////////////////////////
    it('Route: /api/v1/commitment/verify?position=0&commitment=' +
        '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8442666127f98ada3b7', async () => {
        const position = '0';
        const commitment = '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7';
        const req = mockHttp.createRequest({
            method: 'GET',
            url: `/api/v1/commitment/verify?position=${position}&commitment=${commitment}`
        });
        const res = mockHttp.createResponse();
        await controllers.commitment_verify(req, res);
        const json = JSON.parse(res._getData());
        assert(json.response.confirmed === true);
    });
    ///
    /// Add Test ... I'm too lazy to write these nuts test
    ///
    //////////////////////////////////////////////////////////////////////////////
    /// Commitment Send                                                        ///
    //////////////////////////////////////////////////////////////////////////////
    ///
    /// Test Not Completed
    ///
    /// pubKey = 1CsSceq9GWnmozaky3DGa24UER6gRDgibf
    /// pvtKey = bac52bbea2194e7ea1cd3da6585b66d28f1a7a3683eca91af4ba6373d323d24f
    ///

    // non 32 byte string
    it('Route: /api/v1/commitment/send', () => {
        const req = mockHttp.createRequest(
            {
                method: 'POST',
                url: '/api/v1/commitment/send',
                body: {
                    position: 0,
                    token: '4c8c006d-4cee-4fef-8e06-bb8112db6314',
                    commitment: '1',
                }
            });
        const res = mockHttp.createResponse();
        controllers.commitment_send(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === BAD_COMMITMENT);
    });

    // non hex string
    it('Route: /api/v1/commitment/send', () => {
        const req = mockHttp.createRequest(
            {
                method: 'POST',
                url: '/api/v1/commitment/send',
                body: {
                    position: 0,
                    token: '4c8c006d-4cee-4fef-8e06-bb8112db6314',
                    commitment: 'f3d424bf830dbd59eebc3f0a23491a266b7158635188e47b0e2a2bf7dbcc8*&$',
                }
            });
        const res = mockHttp.createResponse();
        controllers.commitment_send(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === BAD_COMMITMENT);
    });

    // non 32 byte string
    it('Route: /ctrl/sendcommitment', () => {
        const req = mockHttp.createRequest(
            {
                method: 'POST',
                url: '/ctrl/sendcommitment',
                body: {
                    position: 0,
                    token: '4c8c006d-4cee-4fef-8e06-bb8112db6314',
                    commitment: '1',
                }
            });
        const res = mockHttp.createResponse();
        ctrlControllers.ctrl_send_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'Non hex or non 32 byte commitment');
    });

    // non hex string
    it('Route: /ctrl/sendcommitment', () => {
        const req = mockHttp.createRequest(
            {
                method: 'POST',
                url: '/ctrl/sendcommitment',
                body: {
                    position: 0,
                    token: '4c8c006d-4cee-4fef-8e06-bb8112db6314',
                    commitment: 'f3d424bf830dbd59eebc3f0a23491a266b7158635188e47b0e2a2bf7dbcc82*&$',
                }
            });
        const res = mockHttp.createResponse();
        ctrlControllers.ctrl_send_commitment(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'Non hex or non 32 byte commitment');
    });

    it('Route: /api/v1/slotexpiry?slot_id=0', async () => {
        const position = 0;
        const req = mockHttp.createRequest({method: 'GET', url: `/api/v1/slotexpiry?slot_id=${position}`});
        const res = mockHttp.createResponse();
        await controllers.slot_expiry(req, res);
        const json = JSON.parse(res._getData());
        assert(new Date(json.response.expiry_date).getTime() === new Date('2025-12-31T23:59:59Z').getTime());
    });

    it('Route: /api/v1/slotexpiry?slot_id=1', async () => {
        const position = 1;
        const req = mockHttp.createRequest({method: 'GET', url: `/api/v1/slotexpiry?slot_id=${position}`});
        const res = mockHttp.createResponse();
        await controllers.slot_expiry(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'your position is unknown to us');
    });

    it('Route: /api/v1/slotexpiry', async () => {
        const req = mockHttp.createRequest({method: 'GET', url: '/api/v1/slotexpiry'});
        const res = mockHttp.createResponse();
        await controllers.slot_expiry(req, res);
        const json = JSON.parse(res._getData());
        assert(json.error === 'missing slot_id parameter');
    });

    it('Route: /api/v1/spend_token', () => {
        const slot_id = 0;
        const req = mockHttp.createRequest(
            {
                method: 'POST',
                url: '/api/v1/spend_token',
                body: {
                    'token_id': 'e1fb930a-23ed-4e0e-abb5-2ada8fe77e8a',
                    'slot_id': slot_id
                }
            });
        
        const res = mockHttp.createResponse();
        controllers.spend_token(req, res);
    });
});
