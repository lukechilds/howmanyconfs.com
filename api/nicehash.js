const fetch = require('isomorphic-fetch');
const sendJson = require('./util/send-json');

const SECONDS = 1;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

const getData = async endpoint => fetch(
	'https://api2.nicehash.com/main/api/v2/' + endpoint
).then(res => res.json());

const getNiceHashData = async () => {
	const [algorithmData, currentValues] = await Promise.all([
		getData('mining/algorithms'),
		getData('public/stats/global/current')
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
			const pricePerHashPerDay = values.p / 100000000;
			algorithm.pricePerHashPerSecond = pricePerHashPerDay / DAYS;
			algorithm.hashrate = values.s;

			algorithm.priceReadable = (pricePerHashPerDay * marketFactor).toFixed(4) + ` BTC/${displayMarketFactor}/day`;
			algorithm.hashrateReadable = (algorithm.hashrate / marketFactor).toFixed(4) + ` ${displayMarketFactor}/s`;

			return algorithm;
		});

	return algorithms;
};

module.exports = getNiceHashData;
module.exports.handler = () => sendJson(getNiceHashData);
