require.config({
    //baseUrl: "js",
    // pathsオプションの設定。"module/name": "path"を指定します。拡張子（.js）は指定しません。
    urlArgs: "bust=v1"
    //, enforceDefine: true
    , paths: {
        'jquery': [
            '//code.jquery.com/jquery-2.0.1.min'
            , '//ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min'
            , '../lib/jquery-2.0.1.min'
        ]
        ,'processing': [
            '//cloud.github.com/downloads/processing-js/processing-js/processing-1.4.1.min'
            //, '//cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing-api.min'
            , '../lib/processing-1.4.1.min'
        ]
        /*
        ,'processing': '../lib/processing-1.4.1.min'
        */
        //,'pjs': 'pjs'
    }
    // shimオプションの設定。モジュール間の依存関係を定義します。
    , shim: {
    }
});
require(['pjs'], function(pjs){
    'use strict';

    var init = function(){
        pjs.setup = function(){
            pjs.size(500, 500);
            pjs.frameRate(10);
        };
        pjs.draw = function(){
            pjs.background(200);
            pjs.ellipse(200, 200, 100, 100);
        };
        pjs.mousePressed = function(){
        };
        pjs.mouseReleased = function(){
        };
        pjs.setup();
    };
    init();
});
