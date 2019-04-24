import coinBlacklist from './coin-blacklist';

const SECONDS = 1;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;

const getCoinData = async () => {
	// Fetch coin data
	const response = await fetch('https://cors.io/?https://www.crypto51.app/coins.json');
	let {coins} = await response.json();

	// Format
	coins = coins
		.filter(coin => {
			return (
				typeof coin.attack_hourly_cost === 'number' &&
				!coinBlacklist.includes(coin.symbol)
			);
		})
		.map(coin => ({
			symbol: coin.symbol,
			name: coin.name,
			hashRateCostPerSecond: (coin.attack_hourly_cost / HOURS),
			algorithm: coin.algorithm,
			hashRate: coin.hash_rate,
			hashRateFormatted: coin.hash_rate_pretty,
			marketCap: coin.market_cap,
			marketCapFormatted: coin.market_cap_pretty,
			blockTimeInSeconds: coin.block_time
		}))
		.sort((a, b) => b.marketCap - a.marketCap);

	// Calculate confirmation data
	const referenceCoinSymbol = 'BTC';
	const referenceConfirmations = 6;
	const referenceCoin = coins.find(coin => coin.symbol === referenceCoinSymbol);
	if (!referenceCoin) {
		return [];
	}
	const referenceCoinWorkTime = (referenceConfirmations * referenceCoin.blockTimeInSeconds);

	coins = coins.map(coin => {
		const multiplier = (referenceCoin.hashRateCostPerSecond / coin.hashRateCostPerSecond);
		const workTime = (referenceCoinWorkTime * multiplier);
		const confirmations = Math.ceil(workTime / coin.blockTimeInSeconds);
		const estimatedTimeForConfs = (coin.blockTimeInSeconds * confirmations);

		return {
			...coin,
			multiplier,
			workTime,
			confirmations,
			estimatedTimeForConfs
		};
	});

	return coins;
};

export default getCoinData;
