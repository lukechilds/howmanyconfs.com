import escapeHTML from 'escape-html';
import {version} from '../package';
import coinHasIcon from './coin-has-icon';
import getCoinSVGPath from './get-coin-svg-path';
import getCoinName from './get-coin-name';
import formatSeconds from './format-seconds';
import coinBlackList from './coin-blacklist';
import formatDollars from './format-dollars';
import formatUnits from './format-units';

const BITCOIN_CONFIRMATIONS = 6;

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
					<a data-sort="multiplier" ${sortBy === 'multiplier' && 'data-sort-active'}>Proof-of-Work</a>
				</td>
				<td>
					<a data-sort="confirmations" ${sortBy === 'confirmations' && 'data-sort-active'}>Equivalent Confs</a>
				</td>
				<td>
					<a data-sort="timeForConfs" ${sortBy === 'timeForConfs' && 'data-sort-active'}>Estimated Time</a>
				</td>
				<td>
					<a data-sort="multiplier" ${sortBy === 'multiplier' && 'data-sort-active'}>Difference</a>
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
				<td>${escapeHTML(`${coin.algorithm} @ ${formatUnits(coin.hashrate, 'H/s')}`)} = ${formatUnits(coin.watts, 'W')}</td>
				<td>${escapeHTML(coin.confirmations.toLocaleString())} confs</td>
				<td>${escapeHTML(formatSeconds(coin.timeForConfs))}</td>
				<td>${escapeHTML(coin.symbol === 'BTC' ? '-' : `${Math.round(coin.multiplier).toLocaleString()}x slower`)}</td>
			</tr>
			`).join('')}
			</tbody>
		`;
	}

	document.dispatchEvent(new Event('prerender-trigger'));
};

fetch('https://howmanyconfs.com/api/data')
	.then(response => response.json())
	.then(coins => {
		const bitcoin = coins.find(coin => coin.symbol === 'BTC');

		coins = coins
			.filter(coin => coinHasIcon(coin.symbol) && !coinBlackList.includes(coin.symbol))
			.map(coin => {
				const multiplier = (bitcoin.watts / coin.watts);
				const workTime = (bitcoin.blockTimeInSeconds * BITCOIN_CONFIRMATIONS * multiplier);
				const confirmations = Math.ceil(workTime / coin.blockTimeInSeconds);
				const timeForConfs = (coin.blockTimeInSeconds * confirmations);

				return {
					...coin,
					multiplier,
					workTime,
					confirmations,
					timeForConfs
				};
			});

		render(coins);

		table.addEventListener('click', ({target}) => {
			if (!target.dataset.sort) {
				return;
			}

			render(coins, target.dataset.sort);
		});
	});
