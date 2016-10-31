var Reader = function(url, parseCallback, finishCallback) {
	var finished=false;
	this.read = function() {
		$.getJSON(url, function(json){
			parseCallback(json);
			if (!finished) {
				finished=true;
				finishCallback();
			}
		}).fail(function(xhr, status, error){
				showErrorFromResponse(xhr);
		}) ;
	};
};
