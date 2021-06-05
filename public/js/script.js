$(document).ready(function () {
		
		var rpc = document.getElementById("rpc"),
			seed = document.getElementById("seed"),
			source = document.getElementById("source"),
			balance = document.getElementById("balance"),
			destination = document.getElementById("destination"),
			amount = document.getElementById("amount"),
			send = document.getElementById("send"),
			remove = document.getElementById("remove"),
			add = document.getElementById("add"),
			accountInfo = document.getElementById("accountInfo"),
			response = document.getElementById("response"),
			options = "",
			amountMax = document.getElementById("amountMax"),
			paste = document.getElementById("paste"),
			copy = document.getElementById("copy"),
			frontier = "",
			representative = ""
		
		
		function toPlainString(num) {
			return math.format(num, {notation: 'fixed'})
		}
		
		function disableForm(allFields) {
			send.setAttribute("disabled","disabled")
			remove.setAttribute("disabled","disabled")
			add.setAttribute("disabled","disabled")
			accountInfo.setAttribute("disabled","disabled")
			if(allFields != true) { rpc.setAttribute("disabled","disabled") }
			seed.setAttribute("disabled","disabled")
			source.setAttribute("disabled","disabled")
			destination.setAttribute("disabled","disabled")
			amount.setAttribute("disabled","disabled")
			paste.classList.remove("formBtn")
			paste.disabled = true
			copy.classList.remove("formBtn")
			copy.disabled = true
			amountMax.classList.remove("formBtn")
			amountMax.disabled = true
		}
		
		function enableForm(allFields) {
			console.log
			send.removeAttribute("disabled")
			if(allFields != true) { rpc.removeAttribute("disabled") }
			seed.removeAttribute("disabled")
			remove.removeAttribute("disabled")
			add.removeAttribute("disabled")
			accountInfo.removeAttribute("disabled")
			source.removeAttribute("disabled")
			destination.removeAttribute("disabled")
			amount.removeAttribute("disabled")
			paste.classList.add("formBtn")
			paste.disabled = false
			copy.classList.add("formBtn")
			copy.disabled = false
			amountMax.classList.add("formBtn")
			amountMax.disabled = false
		}
		
		function listAccounts() {
			if(options == "") {
				source.innerHTML = "<option value='null'>No Accounts Added</option>"
				send.setAttribute("disabled","disabled")
				remove.setAttribute("disabled","disabled")
				source.setAttribute("disabled","disabled")
				destination.setAttribute("disabled","disabled")
				amount.setAttribute("disabled","disabled")
			} else {
				source.innerHTML = options
				send.removeAttribute("disabled")
				remove.removeAttribute("disabled")
				source.removeAttribute("disabled")
				destination.removeAttribute("disabled")
				amount.removeAttribute("disabled")
			}
		}
		
		function getAccountBalance(data) {
			var accountBalance = math.add(math.bignumber(data.balance), math.bignumber(data.pending))
				accountBalance = math.divide(math.bignumber(accountBalance), math.bignumber(1000000000000000000000000000000))
				accountBalance = toPlainString(accountBalance)
				return accountBalance
		}
		
		function changeSeed() {
		  
		 $.ajax({
		 url: "/seed?seed=" + seed.value + "&rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
		  
			 seed.value = "0000000000000000000000000000000000000000000000000000000000000000"
			 data = JSON.parse(data)
			 
		$.ajax({
		 url: "/list?" + "rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
		  
			 data = JSON.parse(data)
			 options = ""
			 
			for (let [key, value] of Object.entries(data.accounts)) {
			  options += "<option value='" + value + "'>" + value + "</option>"
			}
						
			listAccounts()
			
							
			$.ajax({
			 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
			  })
			  .done(function(data) {
			  
				 data = JSON.parse(data)
				 balance.value = getAccountBalance(data)
			  }).catch(function(error) {
			// Error 
		  })
			 
		  }).catch(function(error) {
			// Error 
		  })

		  })
		}
		
		function maxAmount() {
			if(balance.value > 0) {
				amount.value = balance.value
			}
		}
		

		$.ajax({
		 url: "/list?" + "rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
		  
			 data = JSON.parse(data)
			 options = ""
			 
			for (let [key, value] of Object.entries(data.accounts)) {
			  options += "<option value='" + value + "'>" + value + "</option>"
			}
						
			listAccounts()
		
			$.ajax({
			 url: "/balance?account=" + source.value + "&rpc=" + rpc.value,
			 timeout: 5000
			  })
			  .done(function(data) {
			  
				 data = JSON.parse(data)
				 balance.value = getAccountBalance(data)

			  }).catch(function(error) {
			// Error 
		  })
			 
		  }).catch(function(error) {
			// Error   
		  })


		$("#send").on("click", function () {
		
		var amountValue = amount.value * 1000000000000000000000000000000
		amountValue = amountValue.toLocaleString('fullwide', {useGrouping:false})
		
		send.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/send?source=" + source.value + "&destination=" + destination.value + "&amount=" + amountValue + "&rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
			  setTimeout(function(){
				response.innerHTML = "Response: " + data
				send.innerHTML = 'Send'
				enableForm()
				destination.value = ""
				amount.value = ""
				
				$.ajax({
				 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
				  })
				  .done(function(data) {
				  
					 data = JSON.parse(data)
					 balance.value = getAccountBalance(data)
				  })
				 
			  },1500)
		  }).catch(function(error) {
			response.innerHTML = "Response: " + error.statusText
			send.innerHTML = 'Send'
			enableForm()  
		  })
		})
		
		
		$("#remove").on("click", function () {
						
		remove.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/remove?account=" + source.value + "&rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
			  setTimeout(function(){
				response.innerHTML = "Response: " + data
				remove.innerHTML = 'Remove Account'
				enableForm()
				
				$.ajax({
				 url: "/list?" + "rpc=" + rpc.value,
				 timeout: 5000
				  })
				  .done(function(data) {
				  
					 data = JSON.parse(data)
					 options = ""
					 
					for (let [key, value] of Object.entries(data.accounts)) {
					  options += "<option value='" + value + "'>" + value + "</option>"
					}
					
					listAccounts()
					
				$.ajax({
				 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
				  })
				  .done(function(data) {
				  
					 data = JSON.parse(data)		  
					 balance.value = getAccountBalance(data)
				  })
					 
				  }).catch(function(error) {
			// Error 
		  })
				  
			  },1500)
		  }).catch(function(error) {
			response.innerHTML = "Response: " + error.statusText
			remove.innerHTML = 'Remove Account'
			enableForm()  
		  })
		})
		
		
		$("#add").on("click", function () {
						
		add.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/create?" + "rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
			  setTimeout(function(){
				response.innerHTML = "Response: " + data
				add.innerHTML = 'Add Account'
				enableForm()
				
				$.ajax({
				 url: "/list?" + "rpc=" + rpc.value
				  })
				  .done(function(data) {
				  
					 data = JSON.parse(data)
					 options = ""
					 
					for (let [key, value] of Object.entries(data.accounts)) {
					  options += "<option value='" + value + "'>" + value + "</option>"
					}
										
					listAccounts()
					
					$.ajax({
					 url: "/balance?account=" + source.value + "&rpc=" + rpc.value,
					 timeout: 5000
					  })
					  .done(function(data) {
					  
						 data = JSON.parse(data)
						 balance.value = getAccountBalance(data)
					  }).catch(function(error) {
			// Error
		  })
					 
				  }).catch(function(error) {
			// Error  
		  })
				  
			  },1500)
		  }).catch(function(error) {
			response.innerHTML = "Response: " + error.statusText
			add.innerHTML = 'Add Account'
			enableForm() 
		  })
		})
		
		
		$("#accountInfo").on("click", function () {
						
		accountInfo.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/accountinfo?account=" + source.value + "&rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
			  setTimeout(function(){
				frontier = JSON.parse(data).frontier
				representative = JSON.parse(data).representative
				response.innerHTML = "Response: " + data
				accountInfo.innerHTML = 'Account Info'
				enableForm()
								  
			  },1500)
		  }).catch(function(error) {
			response.innerHTML = "Response: " + error.statusText
			accountInfo.innerHTML = 'Account Info'
			enableForm()
		  })
		})
		
		
		$('body').on('change', '#source', function() {
		  
		 $.ajax({
		 url: "/balance?account=" + source.value + "&rpc=" + rpc.value,
		 timeout: 5000
		  })
		  .done(function(data) {
			 data = JSON.parse(data)
			 balance.value = getAccountBalance(data)
		  }).catch(function(error) {
			// Error
		  })
		})
		
		
		
	
		$('body').on('click', '#copy', function() {
			navigator.clipboard.writeText(source.value)
			  .then(() => {
				// Success
			  })
			  .catch(function(error) {
				// Error
			  })
		})
		
		
		$('body').on('click', '#paste', function() {
			navigator.clipboard.readText()
			  .then(text => {
				destination.value = text
			  })
			  .catch(function(error) {
				// Error
			  })
		})
		
		$('body').on('click', '#amountMax', maxAmount)
		
		
		$('body').on('change', '#seed', changeSeed)
		
		
		$('body').on('keyup', '#seed', changeSeed)
		
		
		$('body').on('change', '#rpc', function(){
			if(rpc.value == "") {
				disableForm(true)
			} else {
				enableForm(true)
			}
		})
		
		
		$('body').on('keyup', '#rpc', function(){
			if(rpc.value == "") {
				disableForm(true)
			} else {
				enableForm(true)
			}
		})
				
	})