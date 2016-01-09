var path = require('path');

var publicPath = path.resolve(__dirname, 'public');
var buildPath = path.resolve(__dirname);

module.exports = {
	isProduction: process.env.NODE_ENV === 'production',
	publicPath: publicPath,
	buildPath: buildPath,
	client: {
		name: 'BridalApp UI Client',
		entry: './src/client',
		output: {
			filename: 'bridalapp-ui.js',
			path: path.resolve(publicPath, 'assets'),
			publicPath: '/assets/',
		},
	},
	server: {
		name: 'BridalApp UI Server',
		host: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
		port: process.env.OPENSHIFT_NODEJS_PORT || 80,
		path: process.env.OPENSHIFT_NODEJS_PATH || '/',
		entry: './src/server',
		output: {
			filename: 'server.js',
			path: '',
		},
	},
	apiServer: {
		name: 'BridalApp API Server',
		host: process.env.BRIDALAPP_API_SERVER_HOST || 'localhost',
		port: process.env.BRIDALAPP_API_SERVER_PORT || 8080,
		path: process.env.BRIDALAPP_API_SERVER_PATH || '/api',
	},
	devServer: {
		name: 'Webpack DEV Server',
		host: process.env.BRIDALAPP_DEV_SERVER_HOST || 'localhost',
		port: process.env.BRIDALAPP_DEV_SERVER_PORT || 3000,
		path: process.env.BRIDALAPP_DEV_SERVER_PATH || '/assets/',
	},
};
