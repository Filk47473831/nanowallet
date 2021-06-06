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

async function hashBlock(block) {
	return await nanocurrency.hashBlock(block)
}

async function signBlock(params) {
	return await nanocurrency.signBlock(params)
}

async function computeWork(blockHash) {
	return await nanocurrency.computeWork(blockHash)
}

async function isWorkValid(blockhash, pow) {
	return await nanocurrency.validateWork( { blockHash, work: pow } )
}

async function createBlock(secretKey, block) {
	return await nanocurrency.createBlock(secretKey, block)
}

module.exports = { generateSeed, deriveSecretKey, derivePublicKey, deriveAddress, hashBlock, signBlock, computeWork, isWorkValid, createBlock }