$(document).ready(function() {
	
	var result_to_str = {
		0: "Pending",
		1: "Win",
		2: "Loss"
	};
	
	var betting_addresses = $("#betting_addresses")
	$.getJSON("/api/betting_addresses", function(data) {
		betting_addresses.html('');
		for (var i in data) {
			var ba = jQuery('<div/>', {
				text : data[i].winners + " " + data[i].addr + " ("
						+ data[i].odds * 100
						+ "%) / payout multiplier: x"
						+ data[i].payout.toFixed(5)
			})

			ba.appendTo(betting_addresses);
		}
	});
	
	
	var bets = $("#bets");
	bets.html("Loading...");
	$.getJSON("/api/bets/list", function(data) {
		if (data.success == true) {
			bets.html("");
			var items = [];
			$.each(data.list, function(key, p) {
				if (!p.pay_tx) {
					p.pay_tx = "Pending result"
				}
				if (!p.bet_block) {
					p.bet_block = "Pending result"
				}
				items.push(
					"<tr> " +
					"<td><a href='https://blockchain.info/address/"+p.better+"'>"+p.betting_addr+"</a></td> " +
					"<td><a href='https://blockchain.info/tx/"+p.bet_tx+"'>"+p.bet_tx+"</a></td> " +
					"<td><a href='/detail/"+p.timestamp+"'>"+p.timestamp_str+"</a></td> " +
					"<td><a href='https://blockchain.info/address/"+p.better+"'>"+p.better+"</a></td> " +
					"<td>"+p.amount+"</td> " +
					"<td><a href='/detail/"+p.timestamp+"'>"+result_to_str[p.result]+"</a></td> " +
					"<td>"+p.bet_block+"</td> " +
					"<td>"+p.pay_tx+"</td> " +
					"</tr>"		
				);
			});
			bets.html(items.join(""));
		}
	});
	
	
});