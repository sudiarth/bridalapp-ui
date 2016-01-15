var chalk = require('chalk');
var log = require('picolog');
var fs = require('fs');
var webpack = require('webpack');

var webpackCfg = require('./server.config');

var node_modules = {};
fs.readdirSync('node_modules')
.filter(function(x){
	return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod){
	node_modules[mod] = 'commonjs ' + mod;
});
webpackCfg.externals = node_modules;


webpackCfg.entry.unshift(
	// Webpack's polling-based HMR runtime with a pol interval of 500ms
	'webpack/hot/poll?500'
);

//webpackCfg.cache = true;
webpackCfg.debug = true;
webpackCfg.devtool = 'source-map';

// The filename of the Hot Update Main File. It is inside the output.path directory.
// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
// Default: "[hash].hot-update.json"
// We prefix the folder hmr/ to keep the files from polluting the root
webpackCfg.output.hotUpdateMainFilename = 'hmr/[hash]/hot-update.json';

// The filename of the Hot Update Chunks. They are inside the output.path directory.
// [id] is replaced by the id of the chunk.
// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
// Default: "[id].[hash].hot-update.js"
// We prefix the folder hmr/ to keep the files from polluting the root
webpackCfg.output.hotUpdateChunkFilename = 'hmr/[hash]/hot-update-chunk-[id].js';

// Include comments with information about the modules.
//   require(/* ./test */23)
// Do not use this in production.
webpackCfg.output.pathinfo = true;


webpackCfg.plugins = [
	// BannerPlugin(banner, options)
	// Adds a banner to the top of each generated chunk.
	//  `banner` a string, it will be wrapped in a comment
	//  `options` an optional options object:
	//    `options.raw` if true, banner will not be wrapped in a comment
	//    `options.entryOnly` if true, the banner will only be added to the entry chunks.
	// Add the hashbang to create an executable file
	// Add source map support
	new webpack.BannerPlugin('#!/bin/env node\r\nrequire("source-map-support").install();', {raw:true, entryOnly:false}),

	// OccurenceOrderPlugin(preferEntry)
	// Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
	// This make ids predictable, reduces to total file size and is recommended.
	//  `preferEntry` (boolean) give entry chunks higher priority. This makes entry chunks smaller
	//                but increases the overall size. (recommended)
	new webpack.optimize.OccurenceOrderPlugin(true),

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
];

module.exports = webpackCfg;

log.debug(chalk.styles.grey.open + 'development.server.config=', webpackCfg, chalk.styles.grey.close);
