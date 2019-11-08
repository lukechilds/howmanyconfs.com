const sendJson = require('../send-json');
const getData = require('.');

exports.handler = () => sendJson(getData);
