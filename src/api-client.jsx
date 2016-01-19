import fetch from 'isomorphic-fetch';

let API_URL = '/api';
if (typeof process != 'undefined') {
	const host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
	const port = process.env.OPENSHIFT_NODEJS_PORT || '80';
	const path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
	API_URL = 'http://' + host + (port === '80' ? '' : ':' + port) + path;
}

const ApiClient = {
	url: API_URL,
	fetch: (url) => fetch(API_URL + url),
};

export default ApiClient;
