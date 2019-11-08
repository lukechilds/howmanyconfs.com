const fetch = require('isomorphic-fetch');
const sendJson = require('../send-json');

const getData = async endpoint => fetch(
	`https://whattomine.com/${endpoint}.json`
).then(res => res.json());

const getCoinData = async () => {
	const [gpu, asic] = await Promise.all([
		getData('coins'),
		getData('asic')
	]);

	const coins = Object.entries({...gpu.coins, ...asic.coins})
		.filter(([_, coin]) => coin.tag !== 'NICEHASH')
		.map(([name, coin]) => {
			return {
				symbol: String(coin.tag),
				name: String(name),
				marketCap: parseFloat(coin.market_cap.replace(/[$,]/g, ''), 10),
				price: parseFloat(coin.exchange_rate),
				priceCurrency: String(coin.tag === 'BTC' ? 'USD' : coin.exchange_rate_curr),
				algorithm: String(coin.algorithm),
				hashrate: parseFloat(coin.nethash, 10),
				blockTimeInSeconds: parseFloat(coin.block_time, 10),
				blockReward: parseFloat(coin.block_reward, 10)
			};
		})
		.sort((a, b) => b.marketCap - a.marketCap);

	return coins;
};

module.exports = getCoinData;
module.exports.handler = () => sendJson(getCoinData);
