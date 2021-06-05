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


app.get('/blockcreate', function(req, res) {
    if(req.query.account) {  
 
var dataString = `{
				  "action": "process",
				  "json_block": "true",
				  "subtype": "send",
				  "block": {
					"type": "state",
					"account": "${req.query.account}",
					"previous": "6CDDA48608C7843A0AC1122BDD46D9E20E21190986B19EAC23E7F33F2E6A6766",
					"representative": "${req.query.representative}",
					"balance": "40200000001000000000000000000000000",
					"link": "87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9",
					"link_as_account": "nano_33t5by1653nt196hfwm5q3wq7oxtaix97r7bhox5zn8eratrzoqsny49ftsd",
					"signature": "A5DB164F6B81648F914E49CAB533900C389FAAD64FBB24F6902F9261312B29F730D07E9BCCD21D918301419B4E05B181637CF8419ED4DCBF8EF2539EB2467F07",
					"work": "000bc55b014e807d"
				  }
				}`

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