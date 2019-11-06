const getNiceHashData = require('.');

exports.handler = async () => {
	try {
		return {
			statusCode: 200,
			headers: {
				'Cache-Control': 'public, s-max-age=600',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(await getNiceHashData())
		};
	} catch (error) {
		return {statusCode: 500, body: error.toString()};
	}
};
