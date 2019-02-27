const secureRandom = require('secure-random');
const elliptic = require('elliptic');
const ecdsa = new elliptic.ec('secp256k1');
const sha256 = require('js-sha256');
const ripemd160 = require('ripemd160');
const max = Buffer.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140", 'hex'); 

let foundPrivateKey = false;
let privateKey;

// Create private key - find random number, check that it is valid
while (!foundPrivateKey) {
    privateKey = secureRandom.randomBuffer(32);
    if (Buffer.compare(max, privateKey) == 1) {
        foundPrivateKey = true;
    }

}

console.log('Private: ' + privateKey.toString("hex"));

let keys = ecdsa.keyFromPrivate(privateKey);
let publicKey = keys.getPublic("hex");privateKey

console.log('Public: ' + publicKey);

const hashBeforePKH = sha256(Buffer.from(publicKey, 'hex'))
const publicKeyHash = new ripemd160().update(Buffer.from(hashBeforePKH, 'hex')).digest();

console.log('Public Key Hash: ' + publicKeyHash.toString('hex'));