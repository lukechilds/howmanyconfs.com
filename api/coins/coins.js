const sendJson = require('../send-json');
const getCoinData = require('.');

exports.handler = () => sendJson(getCoinData);
