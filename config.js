
var config = {
	isProduction: process.env.NODE_ENV === 'production',
	api: {
        name: 'BridalApp API Server',
        host: process.env.BRIDALAPP_API_SERVER_HOST || '127.0.0.1',
        port: process.env.BRIDALAPP_API_SERVER_PORT || 8080,
        path: process.env.BRIDALAPP_API_SERVER_PATH || '/api',
        
	},
	ui: {
        name: 'BridalApp UI Server',
		host: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
		port: process.env.OPENSHIFT_NODEJS_PORT || 80,
        path: process.env.OPENSHIFT_NODEJS_PATH || '/',
        entry: '.src/server.jsx',
        clientEntry: 'src/client.jsx',
	},
};

module.exports = config;