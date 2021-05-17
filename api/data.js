const sendJson = require('./util/send-json');
const getCoinData = require('./coins');
const getAlgorithms = require('./algorithms');

const algorithms = getAlgorithms();

const getCoinAlgorithm = coin => {
	return algorithms.find(algorithm => algorithm.name.toLowerCase() === coin.algorithm.toLowerCase());
};

const getData = async () => {
	const coins = await getCoinData();

	const data = coins
		.filter(coin => getCoinAlgorithm(coin))
		.map(coin => {
			const algorithm = getCoinAlgorithm(coin);

			const watts = (coin.hashrate * algorithm.joulesPerHash);

			return {
				...coin,
				watts,
			};
		});

	return data;
};

module.exports = getData;
module.exports.handler = () => sendJson(getData);
