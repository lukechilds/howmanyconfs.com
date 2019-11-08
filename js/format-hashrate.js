const formatHashrate = hashrate => ['H', 'KH', 'MH', 'GH', 'TH', 'PH'].reduce((previous, unit, exponent) => {
	const devisor = (1000 ** exponent);
	if (hashrate > devisor) {
		const value = Math.floor(hashrate / devisor);
		return `${value.toLocaleString()} ${unit}/s`;
	}
	return previous;
});

export default formatHashrate;
