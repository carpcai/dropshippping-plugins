window.setInterval(function() {
	$(".top_play").each(function(){
		// let this = $(this);
		let productIdRaw = $(this).attr("onclick")
		productIdRaw = productIdRaw.replace(/update/, "")
		productIdRaw = productIdRaw.replace(/,'Weekly'/, "")
		productId = productIdRaw.replace(/,'top100'/, "")
		// console.log(productId)
		let data = $(this).html().replace(productId, "")
		$(this).html(data + productId)

	});
},2000)