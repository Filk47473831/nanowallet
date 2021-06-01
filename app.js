const express = require('express')
const app = express()
const request = require('request')

app.use(express.static('public'))

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(80)

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
