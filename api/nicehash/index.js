const got = require('got');

const getNiceHashEndpoint = async endpoint => {
	const response = await got('https://api2.nicehash.com/main/api/v2/' + endpoint, {json: true});

	return response.body;
};

const convertToUnit = (value, unit) => {
	const unitExponent = [
		{units: ['H', 'G', 'SOL'], exponent: 0},
		{units: ['KH', 'KG', 'KSOL'], exponent: 1},
		{units: ['MSOL', 'MH'], exponent: 2},
		{units: ['GH'], exponent: 3},
		{units: ['TH'], exponent: 4},
		{units: ['PH'], exponent: 5}
	];
	const {exponent} = unitExponent.find(value => value.units.includes(unit.toUpperCase()));

	return value / (1000 ** exponent);
};

const getNiceHashData = async () => {
	const [algorithmData, currentValues] = await Promise.all([
		getNiceHashEndpoint('mining/algorithms'),
		getNiceHashEndpoint('public/stats/global/current')
	]);

	const algorithms = algorithmData.miningAlgorithms
		.map(value => {
			const algorithm = {
				id: value.order,
				name: value.title
			};

			const {marketFactor} = value;
			const {displayMarketFactor} = value;

			const values = currentValues.algos.find(algo => algo.a === algorithm.id);
			algorithm.hashrate = values.s;
			algorithm.pricePerHashPerDay = values.p / 100000000;

			algorithm.hashrateReadable = convertToUnit(algorithm.hashrate, displayMarketFactor).toFixed(4) + ` ${displayMarketFactor}/s`;
			algorithm.priceReadable = (algorithm.pricePerHashPerDay * marketFactor).toFixed(4) + ` BTC/${displayMarketFactor}/day`;

			return algorithm;
		});

	return algorithms;
};

module.exports = getNiceHashData;
