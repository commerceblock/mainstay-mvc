# mainstay API

## Database Models

### Attestation (API READ ONLY)
id  | txid | merkle_root
--- | --- | ---
0 | txid0 | 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
1 | txid1 | 2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
2 | txid2 | 3234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
3 | txid3 | 4234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
...

### MerkleCommitment (API READ ONLY)
merkle_root | client_position | commitment
--- | --- | ---
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 0 | "client0 commitment"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 1 | "client1 commitment"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 2 | "client2 commitment"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 3 | "client3 commitment"
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 0 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 1 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 2 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 3 | ...
...

### MerkleProof (API READ ONLY)
merkle_root | client_position | proof
--- | --- | ---
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 0 | "client 0 proof"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 1 | "client 1 proof"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 2 | "client 2 proof"
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 3 | "client 3 proof"
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 0 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 1 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 2 | ...
2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef | 3 | ...
...

### LatestCommitment (API WRITE)
position | commitment
--- | ---
0 | "client 0 latest commitment"
1 | "client 1 latest commitment"
2 | "client 2 latest commitment"
3 | "client 3 latest commitment"


### columns
- id: int
- client_position: int
- txid: 64 char / 32 byte
- merkle_root: 64 char / 32 byte
- commitment: 64 char / 32 byte
- proof: variable char / json / ?

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
