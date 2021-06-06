// Setup and spin-up webserver
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const nano = require('./nano')
const express = require('express')
const app = express()
const request = require('request')

app.use(express.static('public'))

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(80)

console.log("Running at http://localhost/")



// Nano functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				
function NanoBlock (account, previous, representative, balance, link, work) {
	this.account = account
	this.previous = previous
	this.representative = representative
	this.balance = balance
	this.link = link
	this.work = work
}

async function deriveSecretKey(seed) {
	return await nano.deriveSecretKey(seed)
}

async function hashBlock(nanoBlock) {
	return await nano.hashBlock(nanoBlock)
}

async function signBlock(blockHash, secretKey) {
	var params = { "hash": blockHash, "secretKey": secretKey }
	return await nano.signBlock(params)
}

async function computeWork(blockHash, workParams) {
	return await nano.computeWork(blockHash, workParams)
}

async function createBlock(secretKey, nanoBlock) {
	return await nano.createBlock(secretKey, nanoBlock)
}


// User Triggered Actions (via URL)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/list', function(req, res) {
 
var dataString = `{ "action": "account_list", "wallet": "18FF069FB585F9D3A38F2DFE3BF98F51554B9E097F9DC2F86610045A515C4AD1" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)

})

app.get('/create', function(req, res) {
  
var dataString = `{ "action": "account_create", "wallet": "18FF069FB585F9D3A38F2DFE3BF98F51554B9E097F9DC2F86610045A515C4AD1" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)

})


app.get('/remove', function(req, res) {
    if(req.query.account) { 
 
var dataString = `{ "action": "account_remove",  "wallet": "18FF069FB585F9D3A38F2DFE3BF98F51554B9E097F9DC2F86610045A515C4AD1",  "account": "${req.query.account}" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})


app.get('/send', function(req, res) {
    if(req.query.source) { 
 
var dataString = `{ "action": "send", "wallet": "18FF069FB585F9D3A38F2DFE3BF98F51554B9E097F9DC2F86610045A515C4AD1", "source": "${req.query.source}", "destination": "${req.query.destination}", "amount": "${req.query.amount}" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
	
	console.log(body)
	
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})



app.get('/balance', function(req, res) {
    if(req.query.account) {  
 
var dataString = `{ "action": "account_balance", "account": "${req.query.account}" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})


app.get('/seed', function(req, res) {
    if(req.query.seed) {  
 
var dataString = `{ "action": "wallet_change_seed", "wallet": "18FF069FB585F9D3A38F2DFE3BF98F51554B9E097F9DC2F86610045A515C4AD1", "seed": "${req.query.seed}" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})


app.get('/accountinfo', function(req, res) {
    if(req.query.account) {  
 
var dataString = `{ "action": "account_info", "representative": "true", "account": "${req.query.account}" }`

var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})


app.get('/blockcreate', async function(req, res) {
    if(req.query.account) {
		
	workParams = { "workerIndex": 0, "workerCount": 1, "workThreshold": "fffffff800000000" }
	
	console.log(req.query.frontier)
	
	req.query.work = await computeWork(req.query.frontier,workParams)
	
	console.log(req.query.seed)
					
	var createdBlock = new NanoBlock(req.query.account,req.query.frontier,req.query.representative,req.query.newBalance,req.query.destination,req.query.work)

	secretKey = await deriveSecretKey(req.query.seed)

	var nanoBlock = await createBlock(secretKey,createdBlock)

	nanoBlock = JSON.stringify(nanoBlock.block)

	var dataString = `{
					  "action": "process",
					  "json_block": "true",
					  "subtype": "send",
					  "block": ${nanoBlock}
					}`
					
	console.log(dataString)


var options = {
    url: `http://${req.query.rpc}:7076`,
    method: 'POST',
    body: dataString
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    } else {
		res.send(body)
	}
}

request(options, callback)


	}

})