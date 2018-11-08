const assert = require('assert');
const mockHttp = require('node-mocks-http');
const mongoose = require('mongoose');
const controllers = require('../lib/controllers');
////////////////////////////////////////////////////////////////////////////////
/// Connect to MongoBD fot Test                                              ///
////////////////////////////////////////////////////////////////////////////////
var dbConnect = 'mongodb://localhost/mainstay1'
mongoose.connect(dbConnect, (error) => {
  if (error) {
    console.log('Can\'t connect');
    exit();
  }
  console.log('Connected');
});
///
describe('Test Controllers', () => {
  //////////////////////////////////////////////////////////////////////////////
  /// Test                                                                   ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1', () => {
    const req = mockHttp.createRequest({ method: 'GET', url: '/api/v1' });
    const res = mockHttp.createResponse();
    controllers.index(req, res);
    assert(JSON.parse(res._getData()).response === 'Mainstay-API-v1');
  });
  //////////////////////////////////////////////////////////////////////////////
  /// Test Latest Attestation                                                ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/latestattestation', () => {
    let req = mockHttp.createRequest({ method: 'GET',
                                       url: '/api/v1/latestattestation' });
    let res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    let json = JSON.parse(res._getData());
    const merkle_root =
        '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090';
    const txid =
        "6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e";
    assert(json.response.merkle_root === merkle_root);
    assert(json.response.txid === txid);
  });
  //////////////////////////////////////////////////////////////////////////////
  /// Test Latest Commitment                                                 ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/latestcommitment?position=0', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position=0' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
           '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
    assert(json.response.merkle_root ===
           '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.merkle_root ===
           '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e');
  });
  it('Route: /api/v1/latestcommitment?position=1', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position=1' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
           '2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f37f48ada3b7');
    assert(json.response.merkle_root ===
           '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.merkle_root ===
           '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e');
  });
  it('Route: /api/v1/latestcommitment?position=2', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position=2' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
           '3a39e34e851d9a1e6cdc3418b54aa57747606bc75e9e84426661f27f98ada3b7');
    assert(json.response.merkle_root ===
           '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.merkle_root ===
           '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e');
  });
  it('Route: /api/v1/latestcommitment?position=3', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position=3' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'your position is unknown to us');
  });
  it('Route: /api/v1/latestcommitment?position=', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position=' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'position expects a int');
  });
  it('Route: /api/v1/latestcommitment?position', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?position' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'position expects a int');
  });
  it('Route: /api/v1/latestcommitment?', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment?' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'missing position parameter');
  });
  it('Route: /api/v1/latestcommitment', () => {
    let req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/latestcommitment' });
    let res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'missing position parameter');
  });
  //////////////////////////////////////////////////////////////////////////////
  /// Test Commitment Latest Proof                                           ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/commitment/latestproof?position=0', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position=0'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
        '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
    assert(json.response.merkle_root ===
        '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.ops[0].append === true);
    assert(json.response.ops[0].commitment ===
        '2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f37f48ada3b7');
    assert(json.response.ops[1].append === true);
    assert(json.response.ops[1].commitment ===
        '91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47');
  });
  it('Route: /api/v1/commitment/latestproof?position=1', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position=1'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
        '2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f37f48ada3b7');
    assert(json.response.merkle_root ===
        '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.ops[0].append === false);
    assert(json.response.ops[0].commitment ===
        '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7');
    assert(json.response.ops[1].append === true);
    assert(json.response.ops[1].commitment ===
        '91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47');
  });
  it('Route: /api/v1/commitment/latestproof?position=2', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position=2'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.commitment ===
        '3a39e34e851d9a1e6cdc3418b54aa57747606bc75e9e84426661f27f98ada3b7');
    assert(json.response.merkle_root ===
        '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090');
    assert(json.response.ops[0].append === true);
    assert(json.response.ops[0].commitment ===
        '3a39e34e851d9a1e6cdc3418b54aa57747606bc75e9e84426661f27f98ada3b7');
    assert(json.response.ops[1].append === false);
    assert(json.response.ops[1].commitment ===
        '01e0ae8d30f77d0d71e006bf05d6382cd8a61a741875608605691ea3a3c4adca');
  });
  it('Route: /api/v1/commitment/latestproof?position=3', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position=3'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'your position is unknown to us');
  });
  it('Route: /api/v1/commitment/latestproof?position=', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position='});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'position expects a int');
  });
  it('Route: /api/v1/commitment/latestproof?position', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?position'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'position expects a int');
  });
  it('Route: /api/v1/commitment/latestproof?', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof?'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'missing position parameter');
  });
  it('Route: /api/v1/commitment/latestproof', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/latestproof'});
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.error === 'missing position parameter');
  });
  //////////////////////////////////////////////////////////////////////////////
  /// Test Commitment Proof                                                  ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/commitment/proof?position=0&commitment='
     '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7', () => {
    const req = mockHttp.createRequest(
        { method: 'GET', url: '/api/v1/commitment/proof'});
    const res = mockHttp.createResponse();
    controllers.commitment_proof(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.merkle_root ===
        '0849d03563d6d7e7d2d0063a5dae944bfcfd4d56d149ffbe73ccead275b2762e');
    assert(json.response.ops[0].append === true);
    assert(json.response.ops[0].commitment ===
        '2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f27f98ada3b7');
    assert(json.response.ops[1].append === true);
    assert(json.response.ops[1].commitment ===
        '91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47');
  });
  ///
  /// Add Test ... I'm too lazy to write these nuts test
  ///
  //////////////////////////////////////////////////////////////////////////////
  /// Test Commitment Verify                                                 ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/commitment/verify?position=0&commitment='
     '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8442666127f98ada3b7', () => {
    const position = 'position=0'
    const commitment = 'commitment='
        '1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8442666127f98ada3b7'
    const req = mockHttp.createRequest(
        { method: 'GET',
          url: '/api/v1/commitment/verify?' + position + '&' + commitment});
    const res = mockHttp.createResponse();
    controllers.commitment_verify(req, res);
    let json = JSON.parse(res._getData());
    assert(json.response.confirmed === true);
  });
  ///
  /// Add Test ... I'm too lazy to write these nuts test
  ///
  //////////////////////////////////////////////////////////////////////////////
  /// Commitment Send                                                        ///
  //////////////////////////////////////////////////////////////////////////////
  it('Route: /api/v1/commitment/send', () => {
    const req = mockHttp.createRequest(
        {method : 'GET', url : '/api/v1/commitment/send'});
    const res = mockHttp.createResponse();
    controllers.commitment_send(req, res);
  });
  mongoose.disconnect();
});
