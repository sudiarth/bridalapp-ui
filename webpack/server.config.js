var path = require('path');
var webpack = require('webpack');
var appRoot = path.resolve(__dirname, '..');

var cfg = require('../config');

module.exports = {
	// The base directory (absolute path!) for resolving the entry option.
	// If output.pathinfo is set, the included pathinfo is shortened to this directory.
	context: appRoot,

	// The entry point for the bundle.
	// If you pass a string: The string is resolved to a module which is loaded upon startup.
	// If you pass an array: All modules are loaded upon startup. The last one is exported.
	entry: [
		// The server entry point
		cfg.server.entry,
	],

	resolve: {
		// The directory (absolute path) that contains your modules.
		// May also be an array of directories. This setting should be used
		// to add individual directories to the search path.
		root: appRoot,
		// IMPORTANT: Setting this option will override the default, meaning that webpack
		// will no longer try to resolve modules using the default extensions. If you want
		// modules that were required with their extension (e.g. require('./somefile.ext'))
		// to be properly resolved, you must include an empty string in your array.
		// Similarly, if you want modules that were required without extensions (e.g.
		// require('underscore')) to be resolved to files with “.js” extensions, you must
		// include ".js" in your array.
		// Default: ["", ".webpack.js", ".web.js", ".js"]
		// https://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: ['', '.webpack.js', '.web.js', '.js', '.json', '.jsx'],
	},

	externals: function(context, request, callback){
		if ((context.indexOf('node_modules') !== -1) || (request.indexOf('.') !== 0)) {
			callback(null, 'commonjs ' + request);
		}
		else {
			callback();
		}
	},

	module: {
		preLoaders: [
			{ test: /\.json$/, exclude: /node_modules/, loader: 'json'},
		],
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				/* query: {
					cacheDirectory: true,
					plugins: [
						'transform-runtime',
					],
				}*/
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
	target: 'node',

	devtool: 'source-map',

	// Include polyfills or mocks for various node stuff:
	//
	// console: true or false
	// global: true or false
	// process: true, "mock" or false
	// Buffer: true or false
	// __filename: true (real filename), "mock" ("/index.js") or false
	// __dirname: true (real dirname), "mock" ("/") or false
	// <node buildin>: true, "mock", "empty" or false
	node: {
		__dirname: true,
		__filename: true,
	},

	// Options affecting the output.
	// If you use any hashing ([hash] or [chunkhash]) make sure to have a consistent ordering of modules. Use the OccurenceOrderPlugin or recordsPath.
	output: {
		// The output directory as absolute path (required).
		// [hash] is replaced by the hash of the compilation.
		path: cfg.server.output.path,

		// The filename of the entry chunk as relative path inside the output.path directory.
		// [name] is replaced by the name of the chunk.
		// [hash] is replaced by the hash of the compilation.
		// [chunkhash] is replaced by the hash of the chunk.
		// ! You must not specify an absolute path here! Use the output.path option.
		filename: cfg.server.output.filename,

		// Which format to export the library:
		// "var" - Export by setting a variable: var Library = xxx (default)
		// "this" - Export by setting a property of this: this["Library"] = xxx
		// "commonjs" - Export by setting a property of exports: exports["Library"] = xxx
		// "commonjs2" - Export by setting module.exports: module.exports = xxx
		// "amd" - Export to AMD (optionally named - set the name via the library option)
		// "umd" - Export to AMD, CommonJS2 or as property in root
		libraryTarget: 'commonjs',
	},


	plugins: [
		// BannerPlugin(banner, options)
		// Adds a banner to the top of each generated chunk.
		//  `banner` a string, it will be wrapped in a comment
		//  `options` an optional options object:
		//    `options.raw` if true, banner will not be wrapped in a comment
		//    `options.entryOnly` if true, the banner will only be added to the entry chunks.
		new webpack.BannerPlugin('#!/bin/env node', {raw:true, entryOnly:true}),

		// OccurenceOrderPlugin(preferEntry)
		// Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
		// This make ids predictable, reduces to total file size and is recommended.
		//  `preferEntry` (boolean) give entry chunks higher priority. This makes entry chunks smaller
		//                but increases the overall size. (recommended)
		new webpack.optimize.OccurenceOrderPlugin(true),

		new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
	],
};
