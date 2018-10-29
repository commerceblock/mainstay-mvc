module.exports = {
  index: function (req, res) {
    res.json({response: 'Mainstay-API'});
  },
  latest_attestation: function (req, res) {
    res.json({response: 'latest_attestation'});
  },
  latest_commitment: function (req, res) {
    res.json({response: 'latest_commitment'});
  },
  commitment_latest_proof: function (req, res) {
    res.json({response: 'commitment_latest_proof'});
  },
  commitment_verify: function (req, res) {
    res.json({response: 'commitment_verify'});
  },
  commitment_proof: function (req, res) {
    res.json({response: 'commitment_proof'});
  },
  commitment_send: function (req, res) {
    res.json({response: 'commitment_send'});
  }
};
