/* eslint-env browser */
import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import {version} from '../package';
import getCoinData from './get-coin-data';
import formatSeconds from './format-seconds';

document.querySelector('.version').innerText = `v${version}`;

getCoinData().then(coins => {
	coins.forEach(({symbol, confirmations, estimatedTimeForConfs, multiplier}) => {
		console.log(`${symbol}: ${confirmations} confs | ${formatSeconds(estimatedTimeForConfs)} | ${Math.round(multiplier)}x slower`);
	});
});
