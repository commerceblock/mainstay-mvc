# mainstay API

## Database Models

### Attestation (API READ ONLY)
txid | merkle_root | confirmed | inserted_at
--- | --- | --- | ---
txid0 | 12345... | true | 2018-11-02 16:59:19.000
txid1 | 22345... | true | 2018-11-03 16:59:19.000
txid2 | 32345... | true | 2018-11-04 16:59:19.000
txid3 | 42345... | false | 2018-11-05 16:59:19.000
...

### MerkleCommitment (API READ ONLY)
merkle_root | client_position | commitment
--- | --- | ---
12345... | 0 | "client0 commitment"
12345... | 1 | "client1 commitment"
12345... | 2 | "client2 commitment"
12345... | 3 | "client3 commitment"
22345... | 0 | ...
22345... | 1 | ...
22345... | 2 | ...
22345... | 3 | ...
...

### MerkleProof (API READ ONLY)
merkle_root | client_position | proof
--- | --- | ---
12345... | 0 | "client 0 proof"
12345... | 1 | "client 1 proof"
12345... | 2 | "client 2 proof"
12345... | 3 | "client 3 proof"
22345... | 0 | ...
22345... | 1 | ...
22345... | 2 | ...
22345... | 3 | ...
...

### LatestCommitment (API WRITE)
client_position | commitment
--- | ---
0 | "client 0 latest commitment"
1 | "client 1 latest commitment"
2 | "client 2 latest commitment"
3 | "client 3 latest commitment"


### columns
- confirmed: bool
- inserted_at: Date
- client_position: int
- txid: string (64 char / 32 byte)
- merkle_root: string (64 char / 32 byte)
- commitment: string (64 char / 32 byte)
- proof: Object

## API Routes

- **/api/latestcommitment GET**

*params*: client_position

*read*: MerkleCommitment

*return*: client commitment in latest attestation

- **/api/latestattestation GET**

*params*:

*read*: Attestation

*return*: latest attestation

- **/api/commitment/latestproof GET**

*params*: client_position

*read*: MerkleProof

*return*: client proof in latest attestation

- **/api/commitment/verify GET**

*params*: commitment, client_position

*read*: Attestation/MerkleCommitment

*return*: commitment verified or not

- **/api/commitment/proof GET**

*params*: commitment, client_position

*read*: MerkleProof

*return*: proof for commitment

- **/api/commitment/send POST**

*body parameters*: client_token or id or signature, commitment

*authentication*: authenticate client

*write*: update commitment for client on LatestCommitment

*return*: acknowledgement
