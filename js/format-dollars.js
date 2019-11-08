const formatDollars = amount => {
	const units = [[1e9, 'B'], [1e6, 'M']];
	for (const [devisor, suffix] of units) {
		if (amount >= devisor) {
			return `$${(amount / devisor).toFixed(2)} ${suffix}`;
		}
	}

	return `$${Math.floor(amount).toLocaleString()}`;
};

export default formatDollars;
