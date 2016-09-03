// client scripts, will be loaded async from the head of the document
// each stage will only start loading once the previous stage has completed
export function scripts(version) {return process.env.NODE_ENV == 'production'
	? [ 	// PRODUCTION
		{	// stage 0, no dependencies
			React: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js',
			fetch: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js',
			componentHandler: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.5.2/extra/material.min.js',
		},
		{	// stage 1, depends on stage 0
			ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js',
		},
		{	// stage 2, depends on stage 1
			ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.3.0/ReactRouter.min.js',
			ReactMDL: 'https://unpkg.com/react-mdl@1.5.2/out/ReactMDL.min.js',
			bridalapp_initial_state: '', // make sure store state is loaded
		},
		{	// stage 3, depends on stage 2
			bridalapp: '/assets/bridalapp-ui.js?v' + version
		}
	]
	: [ 	// DEVELOPMENT
		{	// stage 0, no dependencies
			React: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js',
			fetch: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.js',
			componentHandler: '/material.js',
		},
		{	// stage 1, depends on stage 0
			ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js',
		},
		{	// stage 2, depends on stage 1
			ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.3.0/ReactRouter.js',
			ReactMDL: 'https://unpkg.com/react-mdl@1.5.2/out/ReactMDL.min.js',
			bridalapp_initial_state: '', // make sure store state is loaded
		},
		{	// stage 3, depends on stage 2
			bridalapp: '/assets/bridalapp-ui.js?v' + version
		}
	]
}
export default scripts;
