import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import escapeHTML from 'escape-html';
import {version} from '../package';
import getCoinSVGPath from './get-coin-svg-path';
import getCoinName from './get-coin-name';
import formatSeconds from './format-seconds';
import formatDollars from './format-dollars';
import formatHashrate from './format-hashrate';

document.querySelector('.version').textContent = `v${version}`;

const table = document.querySelector('table.results');

const render = (coins, sortBy) => {
	let sortOrder = 'asc';
	if (!sortBy) {
		sortBy = 'marketCap';
	} else if (
		table.dataset.sortBy === sortBy &&
		table.dataset.sortOrder === sortOrder
	) {
		sortOrder = 'desc';
	}

	coins = coins.sort((a, b) => {
		if (sortOrder === 'asc') {
			return b[sortBy] - a[sortBy];
		}

		return a[sortBy] - b[sortBy];
	});

	table.dataset.sortBy = sortBy;
	table.dataset.sortOrder = sortOrder;

	if (coins.length > 0) {
		table.innerHTML = `
			<thead>
				<td>
					Name
				</td>
				<td>
					<a data-sort="marketCap" ${sortBy === 'marketCap' && 'data-sort-active'}>Market Cap</a>
				</td>
				<td>
					<a data-sort="bitcoinWorkMultiplier" ${sortBy === 'bitcoinWorkMultiplier' && 'data-sort-active'}>Proof-of-Work</a>
				</td>
				<td>
					<a data-sort="bitcoinEquivalentConfirmations" ${sortBy === 'bitcoinEquivalentConfirmations' && 'data-sort-active'}>Equivalent Confs</a>
				</td>
				<td>
					<a data-sort="bitcoinEquivalentTimeForConfs" ${sortBy === 'bitcoinEquivalentTimeForConfs' && 'data-sort-active'}>Estimated Time</a>
				</td>
				<td>
					<a data-sort="bitcoinWorkMultiplier" ${sortBy === 'bitcoinWorkMultiplier' && 'data-sort-active'}>Difference</a>
				</td>
			</thead>
			<tbody>
			${coins.map(coin => `
			<tr>
				<td>
					<img src="${getCoinSVGPath(coin.symbol)}" alt="${coin.symbol} /">
					${escapeHTML(`${getCoinName(coin)} (${coin.symbol})`)}
				</td>
				<td>${escapeHTML(formatDollars(coin.marketCap) || 'Unknown')}</td>
				<td>${escapeHTML(`${coin.algorithm} @ ${formatHashrate(coin.hashrate)}`)}</td>
				<td>${escapeHTML(coin.bitcoinEquivalentConfirmations.toLocaleString())} confs</td>
				<td>${escapeHTML(formatSeconds(coin.bitcoinEquivalentTimeForConfs))}</td>
				<td>${escapeHTML(coin.symbol === 'BTC' ? '-' : `${Math.round(coin.bitcoinWorkMultiplier).toLocaleString()}x slower`)}</td>
			</tr>
			`).join('')}
			</tbody>
		`;
	}

	document.dispatchEvent(new Event('prerender-trigger'));
};

fetch('/api/data')
	.then(response => response.json())
	.then(coins => {
		render(coins);

		table.addEventListener('click', ({target}) => {
			if (!target.dataset.sort) {
				return;
			}

			render(coins, target.dataset.sort);
		});
});
