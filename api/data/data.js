const sendJson = require('../send-json');

const getNiceHashData = require('../nicehash/nicehash');
const getCoinData = require('../coins/coins');

const getData = async () => {
	const [nicehashAlgorithms, coins] = await Promise.all([
		getNiceHashData(),
		getCoinData()
	]);

	const getNiceHashForCoin = coin => {
		const names = {
			'SHA-256': 'sha256asicboost',
			Ethash: 'daggerhashimoto'
		};

		const coinAlgorithm = names[coin.algorithm] || coin.algorithm;
		return nicehashAlgorithms.find(algorithm => algorithm.name.toLowerCase() === coinAlgorithm.toLowerCase());
	};

	const data = coins
		.filter(coin => {
			const nicehash = getNiceHashForCoin(coin);
			if (!nicehash) {
				// See if we can fix some of these
				console.log(coin.symbol, coin.name, coin.algorithm);
			}

			return nicehash;
		})
		.map(coin => {
			const nicehash = getNiceHashForCoin(coin);

			const hashrateCostPerSecond = (coin.hashrate * nicehash.pricePerHashPerSecond);
			const nicehasheable = (nicehash.hashrate / coin.hashrate * 100);

			return {
				...coin,
				hashrateCostPerSecond,
				nicehasheable
			};
		});

	return data;
};

module.exports = getData;
module.exports.handler = () => sendJson(getData);
