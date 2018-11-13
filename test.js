var bitcore = require('bitcore-lib');
var Message = require('bitcore-message');

var pubKey = '1CsSceq9GWnmozaky3DGa24UER6gRDgibf';
var pvtKey = 'bac52bbea2194e7ea1cd3da6585b66d28f1a7a3683eca91af4ba6373d323d24f';

var message = new Message('F01111111111111111111111111111111111111111111111111111111111110F');
var privateKey = new bitcore.PrivateKey(pvtKey);
var signature = message.sign(privateKey);

console.log(signature)

var verified = new Message('This is an example of a signed message.').verify(pubKey, signature);

console.log(verified);

// curl --header "Content-Type: application/json" --request POST --data '{"X-MAINSTAY-APIKEY":"a","X-MAINSTAY-PLAYLOAD":"eyJwb3NpdGlvbiI6MCwiY29tbWl0bWVudCI6IkYwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMEYifQ==","X-MAINSTAY-SIGNATURE-APIKEY":"apiKey","X-MAINSTAY-SIGNATURE-COMMITMENT":"IJbqe50XtfZbQ1b0jr+J1tswSPfZlWwZugXCpYbwYMPuRl+htqSb7wTLYY9RtQ6Bw9Ym5dw0vMNRaDwR8pked2Y="}
