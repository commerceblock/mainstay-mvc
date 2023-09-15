# mainstay models

## Mongo DB Collections

### Attestation

#### sample table

txid | merkle_root | confirmed | inserted_at
--- | --- | --- | ---
txid0 | 12345... | true | 2018-11-02 16:59:19.000
txid1 | 22345... | true | 2018-11-03 16:59:19.000
txid2 | 32345... | true | 2018-11-04 16:59:19.000
txid3 | 42345... | false | 2018-11-05 16:59:19.000


#### columns

- txid: 64 char String
- merkle_root: 64 char String
- confirmed: Boolean
- inserted_at: Date

#### permissions
*read only*

### AttestationInfo

#### sample table

txid | blockhash | amount | time
--- | --- | --- | ---
txid0 | 12345... | 100 | 1542121293
txid1 | 22345... | 99 | 1542121294
txid2 | 32345... | 98 | 1542121295
txid3 | 42345... | 97 | 1542121296

#### columns

- txid: 64 char String
- blockhash: 64 char String
- amount: Int64
- time: Int64

#### permissions
*read only*

### MerkleCommitment

#### sample table

merkle_root | client_position | commitment
--- | --- | ---
12345... | 0 | 6789a...
12345... | 1 | 7789a...
12345... | 2 | 8789a...
12345... | 3 | 9789a...
22345... | 0 | ...
22345... | 1 | ...
22345... | 2 | ...
22345... | 3 | ...

#### columns

- merkle_root: 64 char String
- client_position: int32
- commitment: 64 char string

#### permissions
*read only*

### MerkleProof

#### sample table

merkle_root | client_position | commitment | ops
--- | --- | --- | ---
12345... | 0 | 6789a... | [{}, {}, ...]
12345... | 1 | 7789a... | [{}, {}, ...]
12345... | 2 | 8789a... | [{}, {}, ...]
12345... | 3 | 9789a... | [{}, {}, ...]
22345... | 0 | ... | ...
22345... | 1 | ... | ...
22345... | 2 | ... | ...
22345... | 3 | ... | ...

#### columns

- merkle_root: 64 char String
- client_position: Int32
- commitment: 64 char String
- ops: []ProofObject
- ProofObject: {append: bool, commitment: 64 char String}

#### permissions
*read only*

### ClientCommitment

#### sample table
client_position | commitment
--- | ---
0 | 9abcd...
1 | 0abcd...
2 | 1abcd...
3 | 2abcd...

#### columns

- client_position: Int32
- commitment: 64 char String

#### permissions
*read/write*

### ClientDetails

#### sample table
client_position | auth_token | pubkey | expiry_date
--- | --- | --- | ---
0 | ... | ... | ...
1 | ... | ... | ...
2 | ... | ... | ...
3 | ... | ... | ...

#### columns

- client_position: Int32
- auth_token: base64 String
- pubkey: 66 char String (compressed), 130 char String (uncompressed)
- expiry_date: Date

#### permissions
*read/write*

### TokenDetails

#### sample table
token_id | value | confirmed | amount
--- | --- | --- | ---
0 | ... | ... | ...
1 | ... | ... | ...
2 | ... | ... | ...
3 | ... | ... | ...

#### columns

- token_id: base64 String
- value: Number
- confirmed: Boolean
- amount: Number

#### permissions
*read/write*

## API Routes
- **/api/latestcommitment GET**

*params*: client_position

*read*: Attestation, MerkleCommitment

*return*: txid, merkle_root, commitment

- **/api/latestattestation GET**

*params*:

*read*: Attestation

*return*: txid, merkle_root

- **/api/commitment/latestproof GET**

*params*: client_position

*read*: MerkleProof

*return*: merkle_root, commitment, ops

- **/api/commitment/verify GET**

*params*: commitment, client_position

*read*: Attestation, MerkleCommitment

*return*: commitment verified or not

- **/api/commitment/proof GET**

*params*: merkle_root, client_position

*read*: MerkleCommitment, MerkleProof

*return*: merkle_root, commitment, ops

- **/api/commitment/send POST**

*body parameters*: client_token or id or signature, commitment

*authentication*: authenticate client

*write*: update commitment for client on ClientCommitment

*return*: acknowledgement

- **/api/token/init GET**

*params*: value

*write*: add new record for TokenDetails

*return*: lightning_invoice, token_id, value

- **/api/token/verify GET**

*params*: token_id

*write*: update confirmed, amount for TokenDetails

*return*: amount, confirmed

- **/api/slotexpiry GET**

*params*: slot_id

*read*: ClientDetails

*return*: expiry_date

- **/api/spendtoken POST**

*params*: token_id, slot_id

*write*: add new record for ClientDetails / update expiry_date for given slot_id in ClientDetails

*return*: auth_token, slot_id, expiry_date
