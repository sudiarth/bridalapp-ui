import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
//import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
import { RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
	static propTypes = {
		lang: PropTypes.string,
		store: PropTypes.object,
		script: PropTypes.string,
	}

	static defaultProps = {
		lang: 'en-US',
	}

	render() {
		const { lang, store, ...renderProps } = this.props;
		const content = ReactDOM.renderToString(
			<Provider store={store}>
				<RoutingContext {...renderProps} />
			</Provider>
		);

		return (
			<html lang={this.props.lang}>
				<head>
					{DocumentMeta.renderAsReact()}
					<link rel="shortcut icon" href="/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="stylesheet" href="https://cdn.rawgit.com/tleunen/react-mdl/v1.0.4/extra/material.min.css" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link rel="stylesheet" href="/style.css" />
				</head>
				<body>
					<div id="bridalapp" dangerouslySetInnerHTML={{__html: content}} />
					<script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(store.getState())};`}} charSet="UTF-8"/>
					<script src="https://cdn.rawgit.com/tleunen/react-mdl/v1.0.4/extra/material.min.js" />
					<script src={this.props.script} charSet="UTF-8"/>
				</body>
			</html>
		);
	}
}
