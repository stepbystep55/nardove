require.config({
	urlArgs: 'v001'
    //urlArgs: 'bust=v1'
	, enforceDefine: true
	, paths: {
		'jquery': [
			'//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min'
			, '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
			, '../lib/jquery-2.0.3.min'
		]
		, 'processing': [
			'//cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing-api.min'
			,'//github.com/downloads/processing-js/processing-js/processing-1.4.1-api.min'
			, '../lib/processing-1.4.1-api.min'
		]
	}
	// shimオプションの設定。モジュール間の依存関係を定義します。
	, shim: {
		'processing': {
			exports: 'Processing'
		}
		, 'pjs': {
			deps: ['jquery','processing'] 
		}
		,'pjsx': {
			deps:['pjs'] 
		}

	}
});
define(['pjs', 'pjsx'], function(pjs, pjsx){
	'use strict';

	var init = function(){
		var g1;
		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			pjs.background(200);
			g1 = new pjsx.GVector(100, 200);
			pjs.ellipse(g1.x, g1.y, 100, 100);
		};
		pjs.draw = function(){
			console.log(g1.grbd);
		};
		pjs.mousePressed = function(){
			g1.grb(pjs.mouseX, pjs.mouseY);
		};
		pjs.mouseReleased = function(){
			g1.rls();
		};
		pjs.setup();
	};
	init();
});
