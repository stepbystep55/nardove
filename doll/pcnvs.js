define(['jquery', 'processing'], function($){
	return {
		pjs: new Processing($('#cnvs')[0])
	};
});
