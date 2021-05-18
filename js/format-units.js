const formatUnits = (originalValue, singleUnit) => ['', 'K', 'M', 'G', 'T', 'P'].reduce((previous, unit, exponent) => {
	const devisor = (1000 ** exponent);
	if (originalValue > devisor) {
		let value = originalValue / devisor;
		value = value < 10 ? value.toFixed(2) : Math.floor(value);
		return `${value.toLocaleString()} ${unit}${singleUnit}`;
	}

	return previous;
});

export default formatUnits;
