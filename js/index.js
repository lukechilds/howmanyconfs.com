import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import escapeHTML from 'escape-html';
import {version} from '../package';
import getCoinData from './get-coin-data';
import getCoinSVGPath from './get-coin-svg-path';
import getCoinName from './get-coin-name';
import formatSeconds from './format-seconds';

document.querySelector('.version').textContent = `v${version}`;

const table = document.querySelector('table.results');

const render = coins => {
	if (coins.length > 0) {
		table.innerHTML = `
			<thead>
				<td>Name</td>
				<td data-sort="marketCap">Market Cap</td>
				<td data-sort="multiplier">Proof-of-Work</td>
				<td data-sort="multiplier">Equivalent Confs</td>
				<td data-sort="multiplier">Estimated Time</td>
				<td data-sort="multiplier">Difference</td>
			</thead>
			<tbody>
			${coins.map(coin => `
			<tr>
				<td>
					<img src="${getCoinSVGPath(coin.symbol)}" alt="${coin.symbol} /">
					${escapeHTML(`${getCoinName(coin)} (${coin.symbol})`)}
				</td>
				<td>${escapeHTML(coin.marketCapFormatted || 'Unknown')}</td>
				<td>${escapeHTML(`${coin.algorithm} @ ${coin.hashRateFormatted}`)}</td>
				<td>${escapeHTML(coin.confirmations.toLocaleString())} confs</td>
				<td>${escapeHTML(formatSeconds(coin.estimatedTimeForConfs))}</td>
				<td>${escapeHTML(coin.symbol === 'BTC' ? '-' : `${Math.round(coin.multiplier).toLocaleString()}x slower`)}</td>
			</tr>
			`).join('')}
			</tbody>
		`;
	}

	document.dispatchEvent(new Event('prerender-trigger'));
};

getCoinData().then(coins => {
	render(coins);

	table.addEventListener('click', ({target}) => {
		if (!target.dataset.sort) {
			return;
		}

		let sortOrder = 'asc';
		if (
			table.dataset.sortBy === target.dataset.sort &&
			table.dataset.sortOrder === sortOrder
		) {
			sortOrder = 'desc';
		}

		const orderedCoins = coins.sort((a, b) => {
			if (sortOrder === 'asc') {
				return b[target.dataset.sort] - a[target.dataset.sort];
			}

			return a[target.dataset.sort] - b[target.dataset.sort];
		});

		table.dataset.sortBy = target.dataset.sort;
		table.dataset.sortOrder = sortOrder;
		render(orderedCoins);
	});
});
