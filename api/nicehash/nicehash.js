const getNiceHashData = require('.');

exports.handler = async () => {
	try {
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, s-max-age=600',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				error: false,
				data: await getNiceHashData()
			})
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				error: true,
				message: error.message
			})
		};
	}
};
