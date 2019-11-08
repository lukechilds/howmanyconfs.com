const formatDollars = amount => {
	if (amount >= 1e9) {
		amount = (amount / 1e9).toFixed(2) + ' B';
	} else if (amount >= 1e6) {
		amount = (amount / 1e6).toFixed(2) + ' M';
	} else {
		amount = Math.floor(amount).toLocaleString();
	}

	return '$' + amount;
}

export default formatDollars;
