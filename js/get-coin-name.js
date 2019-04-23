import coinlist from 'coinlist';

const nameOverrides = new Map(Object.entries({
	QRL: 'Quantum R L',
	HTH: 'HelpTheHomeless'
}));

const getCoinName = coin => {
	const override = nameOverrides.get(coin.symbol);
	const coinlistName = coinlist.get(coin.symbol, 'name');

	return override || coinlistName || coin.name;
};

export default getCoinName;
