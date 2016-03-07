var chalk = require('chalk');
var log = require('picolog');
var fs = require('fs');
var webpack = require('webpack');

var cfg = require('../config');
var webpackCfg = require('./client.config');

webpackCfg.entry.unshift(
/*
	'webpack-dev-server/client?http://' + cfg.server.host + (cfg.server.port !== 80 ? cfg.server.port + ':' : '') + cfg.devServer.path,
	'webpack/hot/only-dev-server'
*/

	// For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost/assets'

//	'webpack-hot-middleware/client'
);

// The filename of the Hot Update Chunks. They are inside the output.path directory.
// [id] is replaced by the id of the chunk.
// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
// Default: "[id].[hash].hot-update.js"
// We prefix the folder hmr/ to keep the files from polluting the assets folder
webpackCfg.output.hotUpdateChunkFilename = 'hmr/[id].[hash].hot-update.js';

// The filename of the Hot Update Main File. It is inside the output.path directory.
// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
// Default: "[hash].hot-update.json"
// We prefix the folder hmr/ to keep the files from polluting the assets folder
webpackCfg.output.hotUpdateMainFilename = 'hmr/[hash].hot-update.json';

//webpackCfg.output.publicPath = 'http://' + cfg.devServer.host + ':' + cfg.devServer.port + cfg.devServer.path

webpackCfg.plugins.push(
	// HotModuleReplacementPlugin()
	// Enables Hot Module Replacement. (This requires records data if not in dev-server mode, recordsPath)
	// Generates Hot Update Chunks of each chunk in the records. It also enables the API and makes __webpack_hash__
	// available in the bundle.
	// ! Only add HotModuleReplacementPlugin here when you don't use cmd line option --hot
	// because it will break if we add both! see https://github.com/webpack/webpack/issues/1830
	new webpack.HotModuleReplacementPlugin(),

	// NoErrorsPlugin()
	// When there are errors while compiling this plugin skips the emitting phase
	// (and recording phase), so there are no assets emitted that include errors.
	// The emitted flag in the stats is false for all assets. If you are using the
	// CLI, the webpack process will not exit with an error code by enabling this plugin.
	// If you want webpack to "fail" when using the CLI, please check out the bail option.
	new webpack.NoErrorsPlugin()
);

webpackCfg.devServer = {
	host: cfg.devServer.host,
	port: cfg.devServer.port,
	headers: {
		"Access-Control-Allow-Origin": "http://localhost",
		"Access-Control-Allow-Credentials": "true"
	}
};

module.exports = webpackCfg;

log.debug(chalk.styles.grey.open + 'development.client.config=', webpackCfg, chalk.styles.grey.close);
