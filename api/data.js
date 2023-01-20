const {getCoinData} = require('./coins');
const {getAlgorithms} = require('./algorithms');

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
			coin.watts = (coin.hashrate * algorithm.joulesPerHash);

			return coin;
		});

	return data;
};

module.exports = async (request, response) => response.json(await getData());
