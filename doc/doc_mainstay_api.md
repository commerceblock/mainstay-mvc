# Documentation Mainstay API

_REST_


timestamp = timestamp in milli second

allowance = allocation des ressource "cont" est le coup du processuse en nano second

merkle root =

commitment =

txid = Id Transaction


ops

_Public Endpoints_
```js
const request = require('request');
const url = "https://localhost:9000/api/v1";

request.get(url + "Endpoint/address", (error, response, body) => {
  console.log(body);
});
```
- _Latest Attestation_
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
    "merkle_root": "7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090",
    "txid": "6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e",
  },
  "timestamp": 1541762949142,
  "allowance": {
    "cost": 15107449
  }
}
```
- _Latest Commitment_
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
    "commitment": "1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7",
    "merkle_root": "7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090",
    "txid": "6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e"
  },
  "timestamp": 1541763110233,
  "allowance": {
    "cost": 1944359
  }
}
```
- _Commitment Latest Proof_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

request.get(url + '/commitment/latestproof?position=0', (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "commitment": "1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7",
    "merkle_root": "7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090",
    "ops": [
      {
        "append": true,
        "commitment": "2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f37f48ada3b7"
      },
      {
        "append": true,
        "commitment":"91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47"
      }
    ]
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
- _Commitment Proof_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

const route = '/commitment/proof'
const position = 'position=0'
const commitment = 'commitment=1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7'

request.get(url + route + '?' + position + '&' + commitment, (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "merkle_root": "0849d03563d6d7e7d2d0063a5dae944bfcfd4d56d149ffbe73ccead275b2762e",
    "ops": [
      {
        "append": true,
        "commitment": "2a39e34e883d9a1e6cdc3418b54aa57747106bc75e3e84426661f27f98ada3b7"
      },
      {
        "append": true,
        "commitment":"91ffafe62866dd95ea1ed7a56907ddc59ea495b477c3e8f853ee2d1b55a24d47"
      }
    ]
  },
  "timestamp": 1541764083449,
  "allowance": {
    "cost": 2938583
  }
}
```
- _Commitment Verify_
```js
// Exemple Request
const request = require('request')
const url = "https://localhost:9000/api/v1";

const route = '/commitment/verify'
const position = 'position=0'
const commitment = 'commitment=1a39e34e881d49a1e6cdc3418b54aa57747106bc75e9e8443666127f98ada3b7'

request.get(url + route + '?' + position + '&' + commitment, (error, response, body) => {
  console.log(body);
});
```
```js
// Exemple Response
{
  "response": {
    "confirmed":true
  },
  "timestamp": 1541411923448,
  "allowance": {
    "cost": 1544035
  }
}
```
###_Authenticated Endpoints_

- _Commitment Send_

Curl
```perl
curl --header "Content-Type: application/json" --request POST --data '{"X-MAINSTAY-APIKEY":"a","X-MAINSTAY-PLAYLOAD":"eyJwb3NpdGlvbiI6MCwiY29tbWl0bWVudCI6IkYwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMEYifQ==","X-MAINSTAY-SIGNATURE-APIKEY":"apiKey","X-MAINSTAY-SIGNATURE-COMMITMENT":"IJbqe50XtfZbQ1b0jr+J1tswSPfZlWwZugXCpYbwYMPuRl+htqSb7wTLYY9RtQ6Bw9Ym5dw0vMNRaDwR8pked2Y="}' http://localhost:9000/api/v1/commitment/send
```
response
```perl
{"response":"feedback","timestamp":1541761540171,"allowance":{"cost":4832691}}
```
