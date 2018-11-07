# Documentation Mainstay API

_REST_

_Public Endpoints_
```js
const request = require('request');
const url = "https://localhost:9000/api/v1";

request.get(url + "Endpoint/address", (error, response, body) => {
  console.log(body);
});
```
- _latest attestation_
```js
// Exemple Request
const request = require('request');
const url = "https://localhost:9000/api/v1";

request.get(url + '/latestattestation', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "txid": "e7532847a21affdaf6421788b4ad7ac77dd2be8f90a3ef567beda6652a4c5f69",
    "merkle_root": "163174b3729c593f3b6e7d4ea119a4c5b13008c6fce3794a27af75cf3b56e6f6",
    "confirmation": true,
    "commit": 1541411923448
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
- _latest commitment_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

request.get(url + '/latestcommitment?position=0', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "commitment": "6a19f0fb4be54511524bcd5b0c98b38da1ee049a39735c39311e10336024436f"
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
- _commitment latest proof_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

request.get(url + '/commitment/latestproof', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "proof": "c1cda26362828b69266512052b97cb3729e3b052e4ade47c0a1e3383defe73c7"
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
- _commitment proof_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

request.get(url + '/commitment/proof', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "confirmation": true
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
- _commitment verify_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

request.get(url + '/commitment/verify', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    ...................
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
###_Authenticated Endpoints_

- _commitment send_
