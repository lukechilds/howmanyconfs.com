/* eslint-env browser */
import prettyMs from 'pretty-ms';

const formatSeconds = seconds => {
	const ms = seconds * 1000;
	const pretty = prettyMs(ms);

	// Only return first two periods
	return pretty.split(' ').slice(0, 2).join(' ');
};

export default formatSeconds;
