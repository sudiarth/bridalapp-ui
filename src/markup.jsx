import serialize from 'serialize-javascript';

export function markupBefore(version, apiUrl, scripts, meta='', production=process.env.NODE_ENV == 'production') {
	return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${meta}
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="https://cdn.rawgit.com/tleunen/react-mdl/v1.5.3/extra/material.min.css" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
		<link rel="stylesheet" href="/style.css?v${version}" />
		<script>
			window.__bridalapp_api_server='${apiUrl}';
			window.mdlSuppressAutoUpgrade = true;
		</script>
		<script>(function(){
			var loadScripts = (function() {return function(stagedScripts) {
				function loadStage(n) {
					var scripts = Object.keys(stagedScripts[n]).map(function(key){return stagedScripts[n][key]});
					for (var i=0,script; script=scripts[i]; i++) {loadScript(script);}
					return function(){return stageLoaded(n);};
				}
				function loadScript(src) {if (src) {
					var s = document.createElement('script');
					s.async=true;  s.src=src;  s.charSet='UTF-8';
					document.getElementsByTagName('head')[0].appendChild(s);
				}}
				function stageLoaded(n) {
					var deps = Object.keys(stagedScripts[n]);
					for (var i=0,dep; dep=deps[i]; i++) {if (! window[dep]) {return false;}}
					return true;
				}
				var poll = (function(){var timeout; return function(check, cb, delay) {
					(function poller(){
						if (check()) {if (timeout) {clearTimeout(timeout); timeout=null;} cb();}
						else {timeout = setTimeout(poller, delay)}
					})()
				}})();
				var loadNextStage = (function(){var stage=0; return function() {
					if (stage < stagedScripts.length) {poll(loadStage(stage++), loadNextStage, 50)}
				}})()
				loadNextStage();
			}})();

			loadScripts(${JSON.stringify(scripts)});
		})()</script>
	</head>
	<body>
		<div id="bridalapp">`
}

export function markupAfter(state) {
return `</div>
		<script>
			window.bridalapp_initial_state=${serialize(state)};
		</script>
	</body>
</html>
`}
