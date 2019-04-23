/* eslint-env browser */
import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import prettyMs from 'pretty-ms';
import {version} from './package';

document.querySelector('.version').innerText = `v${version}`;

const SECONDS = 1;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;

const getCoinData = async () => {
	const [
		crypto51,
		wtmCoins,
		wtmAsic
	] = await Promise.all([
		'https://www.crypto51.app/coins.json',
		'https://whattomine.com/coins.json',
		'https://whattomine.com/asic.json'
	].map(url => fetch(`https://cors.io/?${url}`).then(res => res.json())));

	const whatToMine = [...Object.values(wtmCoins.coins), ...Object.values(wtmAsic.coins)].filter(alg => alg.tag !== 'NICEHASH');

	let coins = crypto51.coins
		.filter(coin => whatToMine.find(alg => alg.tag === coin.symbol) && typeof coin.attack_hourly_cost === 'number')
		.map(coin => ({
			symbol: coin.symbol,
			name: coin.name,
			hashRateCostPerSecond: (coin.attack_hourly_cost / HOURS),
			algorithm: coin.algorithm,
			hashRate: coin.hash_rate,
			hashRateFormatted: coin.hash_rate_pretty,
			marketCap: coin.market_cap,
			blockTimeInSeconds: Number(whatToMine.find(alg => alg.tag === coin.symbol).block_time)
		}))
		.sort((a, b) => b.marketCap - a.marketCap);

	const referenceCoinSymbol = 'BTC';
	const referenceConfirmations = 6;
	const referenceCoin = coins.find(coin => coin.symbol === referenceCoinSymbol);
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
			estimatedTimeForConfs,
		};
	})

	coins.forEach(({symbol, confirmations, estimatedTimeForConfs, multiplier}) => {
		console.log(`${symbol}: ${confirmations} confs | ${prettyMs(estimatedTimeForConfs * 1000).split(' ').reduce((str, section, index) => index < 2 ? str + ' ' + section : str)} | ${Math.round(multiplier)}x slower`);
	});

	return coins;
};

getCoinData();
