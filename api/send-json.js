const sendJson = async getData => {
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
				updated: new Date(),
				data: await getData()
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

module.exports = sendJson;
