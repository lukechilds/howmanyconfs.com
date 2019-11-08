const getNiceHashData = require('../nicehash');
const getCoinData = require('../coins');

const SECONDS = 1;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;

const getData = async () => {
	const [nicehashAlgorithms, coins] = await Promise.all([
		getNiceHashData(),
		getCoinData()
	]);

	const getNiceHashForCoin = coin => {
		const names = {
			'SHA-256': 'sha256asicboost',
			'Ethash': 'daggerhashimoto',
		};

		const coinAlgorithm = names[coin.algorithm] || coin.algorithm;
		return nicehashAlgorithms.find(algorithm => algorithm.name.toLowerCase() === coinAlgorithm.toLowerCase());
	};

	// Calculate reference bitcoin values
	const bitcoin = coins.find(coin => coin.symbol === 'BTC');
	if (!bitcoin) {
		// Handle this
	}
	const bitcoinHashrateCostPerSecond = (bitcoin.hashrate * getNiceHashForCoin(bitcoin).pricePerHashPerSecond);

	const data = coins
		.filter(coin => {
			const nicehash = getNiceHashForCoin(coin);
			if(!nicehash) {
				// See if we can fix some of these
				console.log(coin.symbol, coin.name, coin.algorithm);
			}

			return nicehash;
		})
		.map(coin => {
			const nicehash = getNiceHashForCoin(coin);

			// Calculate 51% attack values
			const hashrateCostPerSecond = (coin.hashrate * nicehash.pricePerHashPerSecond);
			const attackHourlyCost = (HOURS * hashrateCostPerSecond);
			const nicehasheable = (nicehash.hashrate / coin.hashrate * 100);

			// Calculate confirmation values
			const multiplier = (bitcoinHashrateCostPerSecond / hashrateCostPerSecond);
			const workTime = (bitcoin.blockTimeInSeconds * multiplier);
			const confirmations = Math.ceil(workTime / coin.blockTimeInSeconds);
			const estimatedTimeForConfs = (coin.blockTimeInSeconds * confirmations);

			return {
				...coin,
				attackCost: {
					hashrateCostPerSecond,
					attackHourlyCost,
					nicehasheable,
				},
				bitcoinConfEquivalent: {
					multiplier,
					confirmations,
					estimatedTimeForConfs,
				},
			};
		})

	return data;
};

module.exports = getData;
