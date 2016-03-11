import log from 'picolog';
import React, {Component, PropTypes} from 'react';
const { string, object } = PropTypes;
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
// import DocumentMeta from 'react-document-meta';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.jsx file.
 */
export class Html extends Component {
	static propTypes = {
		store: object.isRequired,
		lang: string,
		version: string,
		apiUrl: string,
	};

	static defaultProps = {
		lang: 'en-US',
		version: '1.0.0',
		apiUrl: '',
	};

	render() {
		const { store, lang, version, apiUrl, ...renderProps } = this.props;
		const content = ReactDOM.renderToString(
			<Provider store={store}>
				<RouterContext {...renderProps} />
			</Provider>
		);
		const html = (apiUrl ? `window.__bridalapp_api_server='${apiUrl}';` : '')
				+ `window.__data=${serialize(store.getState())};`;

		return (
			<html lang={this.props.lang}>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{/* DocumentMeta.renderAsReact() */}
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="stylesheet" href="https://cdn.rawgit.com/tleunen/react-mdl/v1.4.0/extra/material.min.css" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link rel="stylesheet" href={'/style.css?v' + version} />
				</head>
				<body>
					<div id="bridalapp" dangerouslySetInnerHTML={{__html: content}} />
					{process.env.NODE_ENV == 'production' ?
					<div>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0-rc5/ReactRouter.min.js" />
						<script src="https://cdn.rawgit.com/tleunen/react-mdl/v1.4.2/extra/material.min.js" />
						<script src="https://npmcdn.com/react-mdl@1.4.2/out/ReactMDL.min.js" />
					</div>	:
					<div>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js" />
						<script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0-rc5/ReactRouter.js" />
						<script src="https://cdn.rawgit.com/tleunen/react-mdl/v1.4.2/extra/material.min.js" />
						<script src="https://npmcdn.com/react-mdl@1.4.2/out/ReactMDL.min.js" />
					</div>
					}
					<script dangerouslySetInnerHTML={{__html: html}} charSet="UTF-8"/>

					{this.props.children}

					<script src={'/assets/bridalapp-ui.js?v' + version} charSet="UTF-8" />
				</body>
			</html>
		);
	}
}
export default Html;


