var fs = require('fs');
var appRoot = require('app-root-path').toString();
var webpack = require('webpack');

var cfg = require('../config');

module.exports = {
	// The base directory (absolute path!) for resolving the entry option.
	// If output.pathinfo is set, the included pathinfo is shortened to this directory.
	context: appRoot,

	// The entry point for the bundle.
	// If you pass a string: The string is resolved to a module which is loaded upon startup.
	// If you pass an array: All modules are loaded upon startup. The last one is exported.
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		// Webpack hot reloading you can attach to your own server
		// https://github.com/glenjamin/webpack-hot-middleware
		'webpack-hot-middleware/client',
		// The client entry point must be last so it is exported
		'mocha!' + cfg.tests.entry,
	],

	resolve: {
		// IMPORTANT: Setting this option will override the default, meaning that webpack
		// will no longer try to resolve modules using the default extensions. If you want
		// modules that were required with their extension (e.g. require('./somefile.ext'))
		// to be properly resolved, you must include an empty string in your array.
		// Similarly, if you want modules that were required without extensions (e.g.
		// require('underscore')) to be resolved to files with “.js” extensions, you must
		// include ".js" in your array.
		// Default: ["", ".webpack.js", ".web.js", ".js"]
		// https://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: ['', '.js', '.jsx'],
	},

	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router': 'ReactRouter',
		'history': 'History',
	},

	cache: true,
	debug: true,

	module: {
		loaders: [
			{
				test: /\.jsx/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					plugins: [
						'transform-runtime',
						["react-transform", {
							"transforms": [{
								"transform": "react-transform-hmr",
								"imports": ["react"],
								// this is important for Webpack HMR:
								"locals": ["module"]
							}]
						}]
					],
				}
			},
		],
		noParse: /\.min\.js/,
	},

	// Compilation target. Possible values:
	// "web" Compile for usage in a browser-like environment (default)
	// "webworker" Compile as WebWorker
	// "node" Compile for usage in a node.js-like environment (use require to load chunks)
	// "async-node" Compile for usage in a node.js-like environment (use fs and vm to load chunks async)
	// "node-webkit" Compile for usage in webkit, uses jsonp chunk loading but also supports builtin node.js modules plus require(“nw.gui”) (experimental)
	// "atom" Compile for usage in electron (formerly known as atom-shell), supports require for modules necessary to run Electron.
	target: 'web',

	// Options affecting the output.
	// If you use any hashing ([hash] or [chunkhash]) make sure to have a consistent ordering of modules. Use the OccurenceOrderPlugin or recordsPath.
	output: {
		// The output directory as absolute path (required).
		// [hash] is replaced by the hash of the compilation.
		path: cfg.tests.output.path,

		// The filename of the entry chunk as relative path inside the output.path directory.
		// [name] is replaced by the name of the chunk.
		// [hash] is replaced by the hash of the compilation.
		// [chunkhash] is replaced by the hash of the chunk.
		// ! You must not specify an absolute path here! Use the output.path option.
		filename: cfg.tests.output.filename,

		publicPath: cfg.tests.output.publicPath,

		// The filename of the Hot Update Chunks. They are inside the output.path directory.
		// [id] is replaced by the id of the chunk.
		// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
		// Default: "[id].[hash].hot-update.js"
		// Stijn: It seems these files are never actually written to disk...
		hotUpdateChunkFilename: 'hmr/[hash]/hot-update-chunk-[id].js',

		// The filename of the Hot Update Main File. It is inside the output.path directory.
		// [hash] is replaced by the hash of the compilation. (The last hash stored in the records)
		// Default: "[hash].hot-update.json"
		// Stijn: It seems these files are never actually written to disk...
		hotUpdateMainFilename: 'hmr/[hash]/hot-update.json',
	},

	plugins: [
		// BannerPlugin(banner, options)
		// Adds a banner to the top of each generated chunk.
		//  `banner` a string, it will be wrapped in a comment
		//  `options` an optional options object:
		//    `options.raw` if true, banner will not be wrapped in a comment
		//    `options.entryOnly` if true, the banner will only be added to the entry chunks.
		new webpack.BannerPlugin('/* bridalapp-ui-tests */', {raw:true, entryOnly:true}),

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
		new webpack.NoErrorsPlugin(),
	],

	devtool: 'cheap-module-eval-source-map',
};
