const sendJson = require('../send-json');
const getNiceHashData = require('.');

exports.handler = () => sendJson(getNiceHashData);
