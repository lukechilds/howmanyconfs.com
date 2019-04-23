/* eslint-env browser */
import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import escapeHTML from 'escape-html';
import coinlist from 'coinlist';
import {version} from '../package';
import getCoinData from './get-coin-data';
import formatSeconds from './format-seconds';

document.querySelector('.version').innerText = `v${version}`;

getCoinData().then(coins => {
	const table = document.querySelector('table.results');

	table.innerHTML = `
		<thead>
			<td>Name</td>
			<td>Hash Rate</td>
			<td>Equivalent Confirmations</td>
			<td>Estimated Time</td>
			<td>Speed</td>
		</thead>
		<tbody>
			${coins.map(coin => `
			<tr>
				<td>${escapeHTML(`${coinlist.get(coin.symbol, 'name') || coin.name} (${coin.symbol})`)}</td>
				<td>${escapeHTML(`${coin.algorithm} @ ${coin.hashRateFormatted}`)}</td>
				<td>${escapeHTML(coin.confirmations.toLocaleString())} confs</td>
				<td>${escapeHTML(formatSeconds(coin.estimatedTimeForConfs))}</td>
				<td>${coin.symbol === 'BTC' ? '-' : `${escapeHTML(Math.round(coin.multiplier))}x slower`}</td>
			</tr>
			`).join('')}
		</tbody>
	`;
});
