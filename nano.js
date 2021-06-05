const nanocurrency = require('nanocurrency')

async function generateSeed() {
	return await nanocurrency.generateSeed()
}

async function deriveSecretKey(seed) {
	return await nanocurrency.deriveSecretKey(seed, 0)
}

async function derivePublicKey(secretKey) {
	return await nanocurrency.derivePublicKey(secretKey)
}

async function deriveAddress(publicKey) {
	return await nanocurrency.deriveAddress(publicKey)
}

async function computeWork(blockHash) {
	return await nanocurrency.computeWork(blockHash)
}

async function isWorkValid(blockhash, pow) {
	return await nanocurrency.validateWork( { blockHash, work: pow } )
}

module.exports = { generateSeed, deriveSecretKey, derivePublicKey, deriveAddress, computeWork, isWorkValid }