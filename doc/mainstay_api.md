## Documentation Mainstay API

Short documentation for the public API offered on the Mainstay website at `https://testnet.mainstay.xyz/api/v1`.

### REST framework structure

```
response = json response object

response['error'] : json response error field

timestamp : timestamp in ms

allowance : time taken to respond in ns
```

### Public Endpoints

#### Index

API index page.

**request:** https://testnet.mainstay.xyz/api/v1

*response*
```
{
    "response": "Mainstay-API-v1",
    "timestamp": 1548329067489,
    "allowance":
    {
        "cost": 4562
    }
}
```

#### Latest Attestation

Provide information on latest attestation.

**request:** https://testnet.mainstay.xyz/api/v1/latestattestation

*response*
```
{
    "response":
    {
        "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
        "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13"
    },
    "timestamp": 1548329116999,
    "allowance":
    {
        "cost": 1796883
    }
}
```

#### Latest Commitment

Provide information on latest commitment for a specific position.

**request:** https://testnet.mainstay.xyz/api/v1/latestcommitment?position=3

*response*
```
{
    "response":
    {
        "commitment": "d235db29356bb02f37e16712c4d34a724282fd81134fbfda61407b3009755a9e",
        "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
        "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13"
    },
    "timestamp": 1548329166363,
    "allowance":
    {
        "cost": 3119659
    }
}
```

#### Commitment

Fetch commitment information for a specific position and merkle_root.

**request:** https://testnet.mainstay.xyz/api/v1/commitment?position=3&merkle_root=f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b

*response*
```
{
    "response":
    {
        "commitment": "d235db29356bb02f37e16712c4d34a724282fd81134fbfda61407b3009755a9e",
        "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b"
    },
    "timestamp": 1548329204516,
    "allowance":
    {
        "cost": 1484074
    }
}
```

#### Commitment Latest Proof

Fetch latest commitment proof for a specific position.

**request:** https://testnet.mainstay.xyz/api/v1/commitment/latestproof?position=1

*response*
```
{
    "response":
    {
        "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13",
        "commitment": "d235db29356bb02f37e16712c4d34a724282fd81134fbfda61407b3009755a9e",
        "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
        "ops": [
        {
            "append": false,
            "commitment": "5309053b9d4db8f86d2c7ec164645bdf1669111280e49e04c036c323b58f4709"
        },
        {
            "append": false,
            "commitment": "213e122aaec314a94f111dd8dc797814660b680f7258f1d95adec56318eabd7c"
        },
        {
            "append": true,
            "commitment": "406ab5d975ae922753fad4db83c3716ed4d2d1c6a0191f8336c76000962f63ba"
        }]
    },
    "timestamp": 1548330374527,
    "allowance":
    {
        "cost": 19732506
    }
}
```

#### Commitment Verify

Check if a commitment for a specific position is included in an attestation.

**request:** https://testnet.mainstay.xyz/api/v1/commitment/verify?position=1&commitment=5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053

*response*
```
{
    "response":
    {
        "confirmed": true
    },
    "timestamp": 1548329867868,
    "allowance":
    {
        "cost": 30212539
    }
}
```

#### Commitment Proof

Get the merkle commitment proof for a specific position and merkle root.

**request:** https://testnet.mainstay.xyz/api/v1/commitment/proof?position=1&merkle_root=f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b

*response*
```
{
    "response":
    {
        "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
        "commitment": "5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053",
        "ops": [
        {
            "append": false,
            "commitment": "21b0a66806bdc99ac4f2e697d05cb17c757ae10deb851ee869830d617e4f519c"
        },
        {
            "append": true,
            "commitment": "622d1b5efe11e9031f1b25aac11587e0ff81a37e9565ded16ee8e82bbc0c2fc1"
        },
        {
            "append": true,
            "commitment": "406ab5d975ae922753fad4db83c3716ed4d2d1c6a0191f8336c76000962f63ba"
        }]
    },
    "timestamp": 1548330450896,
    "allowance":
    {
        "cost": 2098095
    }
}
```

#### Commitment Commitment

Get information on a specific commitment.

**request:** https://testnet.mainstay.xyz/api/v1/commitment/commitment?commitment=5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053

*response*
```
{
    "response":
    {
        "attestation":
        {
            "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
            "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13",
            "confirmed": true,
            "inserted_at": "16:06:41 23/01/19"
        },
        "merkleproof":
        {
            "position": 1,
            "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
            "commitment": "5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053",
            "ops": [
            {
                "append": false,
                "commitment": "21b0a66806bdc99ac4f2e697d05cb17c757ae10deb851ee869830d617e4f519c"
            },
            {
                "append": true,
                "commitment": "622d1b5efe11e9031f1b25aac11587e0ff81a37e9565ded16ee8e82bbc0c2fc1"
            },
            {
                "append": true,
                "commitment": "406ab5d975ae922753fad4db83c3716ed4d2d1c6a0191f8336c76000962f63ba"
            }]
        }
    },
    "timestamp": 1548330505898,
    "allowance":
    {
        "cost": 60414043
    }
}
```

#### Merle Root

Get information on an attested merkle root.

**request:** https://testnet.mainstay.xyz/api/v1/merkleroot?merkle_root=f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b

*response*
```
{
    "response":
    {
        "attestation":
        {
            "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
            "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13",
            "confirmed": true,
            "inserted_at": "16:06:41 23/01/19"
        },
        "merkle_commitment": [
        {
            "position": 0,
            "commitment": "21b0a66806bdc99ac4f2e697d05cb17c757ae10deb851ee869830d617e4f519c"
        },
        {
            "position": 1,
            "commitment": "5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053"
        },
        {
            "position": 2,
            "commitment": "5309053b9d4db8f86d2c7ec164645bdf1669111280e49e04c036c323b58f4709"
        },
        {
            "position": 3,
            "commitment": "d235db29356bb02f37e16712c4d34a724282fd81134fbfda61407b3009755a9e"
        },
        {
            "position": 4,
            "commitment": "9b07569d4fd42ae3a19c0803b7401443e0275feb728e8103330d7d8615eecb62"
        }]
    },
    "timestamp": 1548330553639,
    "allowance":
    {
        "cost": 3318936
    }
}
```

#### Position

Get information on a client position.

**request:** https://testnet.mainstay.xyz/api/v1/position?position=1

*response*
```
{
    "response":
    {
        "position": [
        {
            "position": 1,
            "merkle_root": "300ab922905c67631e46e6d014be286fe1bb6dc550ae2df83484fcb1ccb21011",
            "commitment": "5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053",
            "ops": [
            {
                "append": false,
                "commitment": "2851174cf04f206e6fdfd78a9208c90a324fea5e97ee5b0629d35b5a853fbcfc"
            },
            {
                "append": true,
                "commitment": "622d1b5efe11e9031f1b25aac11587e0ff81a37e9565ded16ee8e82bbc0c2fc1"
            },
            {
                "append": true,
                "commitment": "406ab5d975ae922753fad4db83c3716ed4d2d1c6a0191f8336c76000962f63ba"
            }]
        },
        {
            "position": 1,
            "merkle_root": "2522e16722cfb1b29d01bbe6bfabe54ef7dd69b8bf8a00f911103284eebf4e3e",
            "commitment": "5555c29bc4ac63ad3aa4377d82d40460440a67f6249b463453ca6b451c94e053",
            "ops": [
            {
                "append": false,
                "commitment": "586f199625d902706e0ebf24e2720e62f3f4343a5d7b2ddc2fac155fb359ca3a"
            },
            {
                "append": true,
                "commitment": "622d1b5efe11e9031f1b25aac11587e0ff81a37e9565ded16ee8e82bbc0c2fc1"
            },
            {
                "append": true,
                "commitment": "406ab5d975ae922753fad4db83c3716ed4d2d1c6a0191f8336c76000962f63ba"
            }]
        }, ]
    },
    "timestamp": 1548330579389,
    "allowance":
    {
        "cost": 31613129
    }
}
```

#### Attestation

Get information on an attestation.

**request:** https://testnet.mainstay.xyz/api/v1/attestation?txid=38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13

*response*
```
{
    "response":
    {
        "attestation":
        {
            "merkle_root": "f46a58a0cc796fade0c7854f169eb86a06797ac493ea35f28dbe35efee62399b",
            "txid": "38fa2c6e103673925aaec50e5aadcbb6fd0bf1677c5c88e27a9e4b0229197b13",
            "confirmed": true,
            "inserted_at": "16:06:41 23/01/19"
        },
        "attestationInfo":
        {
            "txid": "86b372fb70e0935bfff4d6ba112e78cb9a3201ca15251dcd7db7cbf135b342b5",
            "amount": 149.9999155,
            "blockhash": "3c50145441751dfb8f01cd05f21a24d0763005334667daa734bbf4147eeabe14",
            "time": 1548253554
        }
    },
    "timestamp": 1548330644403,
    "allowance":
    {
        "cost": 7959634
    }
}
```

#### Attestation Proof

Get the merkle commitment proof for a specific position and attestation txid.

**request:** https://testnet.mainstay.xyz/api/v1/attestation/proof?position=1&txid=2042562f90a5f8905f9af9931e6274deaa2cce70028821bd4bf3c176bc08f460

*response*
```
{
    "response": {
        "txid": "2042562f90a5f8905f9af9931e6274deaa2cce70028821bd4bf3c176bc08f460",
        "merkle_root": "394d281d269493b82820befa7278baa0a836b8af42341c48c9a86681dfceeccd",
        "commitment": "9a39a34e322e4aa1e6cdc3418b54aa57747106bc75e9e8a02666327a9aada3b7",
        "ops": [
            {
                "append": true,
                "commitment": "2b49e32e223d4aa1d6cdc3418b54aa57747106bc75e9e8a03666127f8aad43b8"
            },
            {
                "append": true,
                "commitment": "1fdd8326e34d00097f86815d8b0c951adb4c0b86f00776ca2436b9d08aecc6ec"
            },
            {
                "append": true,
                "commitment": "24c8288a859847fa7c60255a3968e17d1ea57d28ba485313077013e8db2df913"
            },
            {
                "append": true,
                "commitment": "af351174026bc8dcc72b8f0a45afc3432cbd3b46d8d7e4df206990da7f6e580f"
            }
        ]
    },
    "timestamp": 1578302486385,
    "allowance": {
        "cost": 5721095
    }
}
```

#### Block

Get information on a bitcoin block if it contains a mainstay attestation.

**request:** https://testnet.mainstay.xyz/api/v1/blockhash?hash=3c50145441751dfb8f01cd05f21a24d0763005334667daa734bbf4147eeabe14

*response*
```
{
    "response":
    {
        "blockhash":
        {
            "txid": "86b372fb70e0935bfff4d6ba112e78cb9a3201ca15251dcd7db7cbf135b342b5",
            "amount": 149.9999155,
            "blockhash": "3c50145441751dfb8f01cd05f21a24d0763005334667daa734bbf4147eeabe14",
            "time": "14:25:54 23/01/19"
        }
    },
    "timestamp": 1548330671498,
    "allowance":
    {
        "cost": 1543490
    }
}
```

#### Token Init

Initialize new token and generate lightning invoice.

**request:** https://testnet.mainstay.xyz/api/v1/token/init/?value=10000000

*response*
```
{
    "response": {
        "lightning_invoice": {
            "bolt11": "lnbc100u1pjssz64sp5m78l2pm5rr8xxxmnzztn7gpxpgrpxcmgepel5g5zg780h8h7f5kqpp5kqx2u9ypaxgy96r66h047cht6czp2xlyqy9wh42sv6awvv2xg6vsdp2f9h8vmmfvdjjqen0wgsy6ctfdeehgcteyp6x76m9dcxqyjw5qcqpj9qyysgq4hv3lnl8vt7jhjwqnkfw46ke7jpl725t75q2rs0du2tamku5ufe56887zramp47ada68ydterts63y7qz5lfdfujgees5ssjp07ma3cqpzy2j4",
            "expires_at": 1695630805,
            "payment_hash": "b00cae1481e99042e87ad5df5f62ebd604151be4010aebd55066bae631464699"
        },
        "token_id": "1ea3ee4e-1737-48bb-8de5-41d0a0b579de",
        "value": 10000000
    },
    "timestamp": 1695026007572,
    "allowance": {
        "cost": 1639793800
    }
}
```

#### Token Verify

Verify token and lightning invoice if paid or not.

**request:** https://testnet.mainstay.xyz/api/v1/token/verify/?token_id=1ea3ee4e-1737-48bb-8de5-41d0a0b579de

*response*
```
{
    "response": {
        "amount": 10000000,
        "confirmed": true
    },
    "timestamp": 1695026490040,
    "allowance": {
        "cost": 357857200
    }
}
```

#### Spend Token

Use token to pay for an access slot.

**request:** https://testnet.mainstay.xyz/api/v1/spendtoken

*body*
```
{
  "token_id": "1ea3ee4e-1737-48bb-8de5-41d0a0b579de",
  "slot_id": 0
}
```

*response*
```
{
    "response": {
        "auth_token": "3efe751a-4468-400e-93bf-c5eb558f03d7",
        "slot_id": 36,
        "expiry_date": "2023-10-18T08:46:54.777Z"
    },
    "timestamp": 1695026814957,
    "allowance": {
        "cost": 1197231300
    }
}
```

#### Check Expiry Date

Get expiry date for the specified slot.

**request:** https://testnet.mainstay.xyz/api/v1/slotexpiry?slot_id=36

*response*
```
{
    "response": {
        "expiry_date": "2023-10-18T08:46:54.777Z"
    },
    "timestamp": 1695027125978,
    "allowance": {
        "cost": 2972300
    }
}
```

#### Check Fee Rate

Get Fee rate per month in msats.

**request:** https://testnet.mainstay.xyz/api/v1/feerate

*response*
```
{
    "response": {
        "fee_rate": "100000000"
    },
    "timestamp": 1695027322869,
    "allowance": {
        "cost": 12600
    }
}
```

### Authenticated Endpoints

#### Commitment Send

**Node.js example**

```js
const request = require('request');
let elliptic = require('elliptic');
let ec = new elliptic.ec('secp256k1');

const url = "https://testnet.mainstay.xyz/api/v1";
const route = '/commitment/send'
const pubKey = '1CsSceq9GWnmozaky3DGa24UER6gRDgibf';
const pvtKey =
    'bac52bbea2194e7ea1cd3da6585b66d28f1a7a3683eca91af4ba6373d323d24f';
const commitment =
    'F01111111111111111111111111111111111111111111111111111111111110F';

var payload = {
  commitment: commitment,
  position: 0,
  token: '4c8c006d-4cee-4fef-8e06-bb8112db6314',
};

const options = {
  url: url + route,
  body: payload
};

request.post(options, (error, response, body) => {
  if (error)
    return console.log(error);
  ...
});
```

**Curl example**
```perl
curl --header "Content-Type: application/json" --request POST --data '{
    "position": "0",
    "token": "4c8c006d-4cee-4fef-8e06-bb8112db6314",
    "commitment": "f3d424bf830dbd59eebc3f0a23491a266b7158635188e47b0e2a2bf7dbcc8931",
}' https://testnet.mainstay.xyz/api/v1/commitment/send
```

*response*
```perl
{"response":"feedback","timestamp":1541761540171,"allowance":{"cost":4832691}}
```
