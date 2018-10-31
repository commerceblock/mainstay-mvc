const assert = require("assert");
const mockHttp = require("node-mocks-http");
const controllers = require("../lib/controllers");

describe("Test Controllers", () => {
  it("Route: /", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/"
    });
    const res = mockHttp.createResponse();
    controllers.index(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestattestation Good Parameter", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestattestation?position=0"
    });
    const res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestattestation Wrong Parameter 1", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestattestation"
    });
    const res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestattestation Wrong Parameter 2", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestattestation?position"
    });
    const res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestattestation Wrong Parameter 3", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestattestation?position="
    });
    const res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestattestation Wrong Parameter 4", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestattestation?position=FAKE"
    });
    const res = mockHttp.createResponse();
    controllers.latest_attestation(req, res);
    console.log(res._getData())
  });
  it("Route: /api/latestcommitment", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/latestcommitment"
    });
    const res = mockHttp.createResponse();
    controllers.latest_commitment(req, res);
    console.log(res._getData())
  });
  it("Route: /api/commitment/latestproof", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/commitment/latestproof"
    });
    const res = mockHttp.createResponse();
    controllers.commitment_latest_proof(req, res);
    console.log(res._getData())
  });
  it("Route: /api/commitment/proof", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/commitment/proof"
    });
    const res = mockHttp.createResponse();
    controllers.commitment_proof(req, res);
    console.log(res._getData())
  });
  it("Route: /api/commitment/verify", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/commitment/verify"
    });
    const res = mockHttp.createResponse();
    controllers.commitment_verify(req, res);
    console.log(res._getData());
  });
  it("Route: /api/commitment/send", () => {
    const req = mockHttp.createRequest({
      method: "GET",
      url: "/api/commitment/send"
    });
    const res = mockHttp.createResponse();
    controllers.commitment_send(req, res);
    console.log(res._getData())
  });
});
