let elliptic = require('elliptic');
let ec = new elliptic.ec('secp256k1');
//
// Generate Key
//
let keyPair = ec.keyFromPrivate("97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
let privKey = keyPair.getPrivate("hex");
let pubKey = keyPair.getPublic();
console.log("Private key            :", privKey);
console.log("Public key             :", pubKey.encode("hex").substr(2));
console.log("Public key (compressed):", pubKey.encodeCompressed("hex"));
console.log("----------------");
//
// Signing Message
//
let msgHash = '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090';
let signature = ec.sign(msgHash, privKey, "hex", {canonical: true}).toDER('hex');



console.log("Signature              :", signature);
console.log("Msg hash               :", msgHash);

// For check valid
//
var key = ec.keyFromPublic(pubKey, 'hex');

var test2 = "304402201742daea5ec3b7306b9164be862fc1659cc830032180b8b17beffe02645860d602201039eba402d22e630308e6af05da8dd4f05b51b7d672ca5fc9e3b0a57776365c";

console.log("Signature valid?", ec.verify(msgHash, test2, key));
