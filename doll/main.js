require.config({
    //baseUrl: "js",
    // pathsオプションの設定。"module/name": "path"を指定します。拡張子（.js）は指定しません。
    paths: {
        /*
        'jquery': '../lib/jquery-1.9.0.min'
        */
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min'
        ,'processing': '../lib/processing-1.4.1.min'
        ,'pcnvs': 'pcnvs'
    },
    // shimオプションの設定。モジュール間の依存関係を定義します。
    shim: {
    }
});
require(['pmain'], function(Pmain) {
    /*
    new Pmain.Proc().init();
    */
    Pmain.Proc.init();
});
