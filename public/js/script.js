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
			response = document.getElementById("response"),
			options = ""
		
		
		function toPlainString(num) {
			return math.format(num, {notation: 'fixed'})
		}
		
		function disableForm() {
			send.setAttribute("disabled","disabled")
			remove.setAttribute("disabled","disabled")
			add.setAttribute("disabled","disabled")
			rpc.setAttribute("disabled","disabled")
			seed.setAttribute("disabled","disabled")
			source.setAttribute("disabled","disabled")
			destination.setAttribute("disabled","disabled")
			amount.setAttribute("disabled","disabled")
		}
		
		function enableForm() {
			send.removeAttribute("disabled")
			rpc.removeAttribute("disabled")
			seed.removeAttribute("disabled")
			remove.removeAttribute("disabled")
			add.removeAttribute("disabled")
			source.removeAttribute("disabled")
			destination.removeAttribute("disabled")
			amount.removeAttribute("disabled")
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
		 url: "/seed?seed=" + seed.value + "&rpc=" + rpc.value
		  })
		  .done(function(data) {
		  
			 seed.value = "0000000000000000000000000000000000000000000000000000000000000000"
		  
			 data = JSON.parse(data)
			 
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
			 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
			  })
			  .done(function(data) {
			  
				 data = JSON.parse(data)
				 balance.value = getAccountBalance(data)
			  })
			 
		  })

		  })
		}
		
		

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
			 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
			  })
			  .done(function(data) {
			  
				 data = JSON.parse(data)
				 balance.value = getAccountBalance(data)

			  })
			 
		  })


		$("#send").on("click", function () {
		
		var amountValue = amount.value * 1000000000000000000000000000000
		amountValue = amountValue.toLocaleString('fullwide', {useGrouping:false})
		
		send.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/send?source=" + source.value + "&destination=" + destination.value + "&amount=" + amountValue + "&rpc=" + rpc.value
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
		  })
		})
		
		
		$("#remove").on("click", function () {
						
		remove.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/remove?account=" + source.value + "&rpc=" + rpc.value
		  })
		  .done(function(data) {
			  setTimeout(function(){
				response.innerHTML = "Response: " + data
				remove.innerHTML = 'Remove Account'
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
				 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
				  })
				  .done(function(data) {
				  
					 data = JSON.parse(data)		  
					 balance.value = getAccountBalance(data)
				  })
					 
				  })
				  
			  },1500)
		  })
		})
		
		
		$("#add").on("click", function () {
						
		add.innerHTML = '<div class="spinner-grow text-dark" role="status"><span class="sr-only"></span></div>'
		disableForm()

		$.ajax({
		 url: "/create?" + "rpc=" + rpc.value
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
					 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
					  })
					  .done(function(data) {
					  
						 data = JSON.parse(data)
						 balance.value = getAccountBalance(data)
					  })
					 
				  })
				  
			  },1500)
		  })
		})
		
		
		$('body').on('change', '#source', function() {
		  
		 $.ajax({
		 url: "/balance?account=" + source.value + "&rpc=" + rpc.value
		  })
		  .done(function(data) {
		  
			 data = JSON.parse(data)
			 balance.value = getAccountBalance(data)
		  })
		})
		
		$('body').on('change', '#seed', changeSeed)
		
		
		$('body').on('keyup', '#seed', changeSeed)
				
	})