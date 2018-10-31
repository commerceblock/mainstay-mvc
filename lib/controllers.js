const ARG_POSITION = 'position'
const ARG_COMMITMENT = 'commitment'
const BAD_LENGTH_COMMITMENT = 'commitment string parameter must contain 64 characters'
const BAD_TYPE_POSITION = 'position expects a int'
const MISSING_ARG_POSITION = 'missing position parameter'
const MISSING_ARG_COMMITMENT = 'missing commitment parameter'
const NS_PER_SEC = 1000000000
const SIZE_COMMITMENT = 64

function get_commitment_arg(req, res, startTime) {
  const time = new Date();
  let paramCommitment = req.query[ARG_COMMITMENT]
  if (paramCommitment === undefined) {
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({error: MISSING_ARG_COMMITMENT, timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
    return undefined;
  }
  if (paramCommitment.length != SIZE_COMMITMENT) {
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({error: BAD_LENGTH_COMMITMENT, timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
    return undefined;
  }
  return paramCommitment;
}

function get_position_arg(req, res, startTime) {
  const time = new Date();
  let paramPosition = req.query[ARG_POSITION];
  if (paramPosition === undefined) {
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({error: MISSING_ARG_POSITION, timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
    return undefined;
  }
  let position = parseInt(paramPosition);
  if (isNaN(position)) {
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({error: BAD_TYPE_POSITION, timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
    return undefined;
  }
  return position;
}

module.exports = {
  // Function METHOD GET
  index: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'Mainstay-API', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  latest_attestation: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'latest_attestation', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  latest_commitment: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'latest_commitment', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  commitment_latest_proof: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'commitment_latest_proof', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  commitment_verify: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    let position = get_position_arg(req, res, startTime);
    let commitment = get_commitment_arg(req, res, startTime);
    if (position === undefined || commitment === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'commitment_verify', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  commitment_proof: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    let position = get_position_arg(req, res, startTime);
    let commitment = get_commitment_arg(req, res, startTime);
    if (position === undefined || commitment === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'commitment_proof', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  },
  // Function METHOD POST
  commitment_send: (req, res) => {
    const time = new Date();
    let startTime = process.hrtime();
    startTime = startTime[0] * NS_PER_SEC + startTime[1];
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({response: 'commitment_send', timestamp: time.getTime(),
              allowance: { cost: endTime - startTime }});
  }
};
