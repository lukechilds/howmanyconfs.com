/* eslint-env browser */
import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import prettyMs from 'pretty-ms';
import {version} from '../package';
import getCoinData from './get-coin-data';

document.querySelector('.version').innerText = `v${version}`;

getCoinData().then(coins => {
	coins.forEach(({symbol, confirmations, estimatedTimeForConfs, multiplier}) => {
		console.log(`${symbol}: ${confirmations} confs | ${prettyMs(estimatedTimeForConfs * 1000).split(' ').reduce((str, section, index) => index < 2 ? str + ' ' + section : str)} | ${Math.round(multiplier)}x slower`);
	});
});
