$(document).ready( function() {
	data=new Array();
	
	loadData1(data);		
});



function generateLinearGraph(data) {
	var series=new Array();
	for (category in data) {
		series.push(
				{	
					showInLegend: false,  
		        	name: category,
		            data: data[category],
		            marker: {
		                enabled: false
		            }
		        }
		);
	};
	
	console.log(series);
	/*
	chart.highcharts({
	       chart: { zoomType: 'x' },
	       title: { text: ''},
	       subtitle: {text: ''},		        		        
	       xAxis: {
	       	allowDecimals: true,
	       	type:"linear",
	           title: {text: 'Fechas'            }
	       },
	       yAxis: {
	           title: {text: 'Gr&aacute;fica 1'},
	       },
	       tooltip: {
	           headerFormat: '',pointFormat: '{point.value}'
	       },
	       series: series
	 });*/
}


function loadData1(data) {
	
	$.getJSON('http://s3.amazonaws.com/logtrust-static/test/test/data1.json', function(json){
		$.each(json, function(idx, item) {
			insertItem(data, item["cat"].toUpperCase(), new Date(item["d"]), parseFloat(item["value"]));
		});
		loadData2(data);
	}).fail(function(xhr, status, error){
			showErrorFromResponse(xhr);
	}) ;
}

function loadData2(data) {
	$.getJSON('http://s3.amazonaws.com/logtrust-static/test/test/data2.json', function(json){
		$.each(json, function(idx, item) {
			//insertItem(data, item["categ"].toUpperCase(), new Date(item["myDate"]), parseFloat(item["val"]));
		});
		loadData3(data);
	}).fail(function(xhr, status, error){
			showErrorFromResponse(xhr);
	}) ;
}


function loadData3(data) {
	
	$.getJSON('http://s3.amazonaws.com/logtrust-static/test/test/data3.json', function(json){
		$.each(json, function(idx, item) {
			//insertItem(data, item["cat"].toUpperCase(), new Date(item["d"]), parseFloat(item["value"]));
		});
		generateLinearGraph(data);
	}).fail(function(xhr, status, error){
			showErrorFromResponse(xhr);
	}) ;
}


function insertItem(data, category, date, value) {
	if (data[category]==null) {
		data[category]=[];
		data[category][date]=value;
	} else if (data[category][date]==null) {
		data[category][date]=value;
	} else {
		data[category][date]+=value;
	}
}

function showError(xhr) {
	console.log(xhr);
	alert(xhr);
}