require.config({
	urlArgs: 'v001'
	, enforceDefine: true
	, paths: {
		'jquery': [
			'//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min'
			, '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
			, 'lib/jquery-2.0.3.min'
		]
		,'underscore': [
			'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min'
			,'//rawgithub.com/jashkenas/underscore/master/underscore-min'
			, 'lib/underscore-min'
		]
		,'processing': [
			'//cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing-api.min'
			,'//github.com/downloads/processing-js/processing-js/processing-1.4.1-api.min'
			, 'lib/processing-1.4.1-api.min'
		]
	}
	, shim: {
		'underscore': {
			exports: '_'
		}
		,'processing': {
			exports: 'Processing'
		}
	}
});
define(['app'], function(app){
	'use strict';

	app();
});
