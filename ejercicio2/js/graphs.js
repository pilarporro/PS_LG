var DATE_FORMAT="YYYY-MM-DD";

var data;
var finished=0;
var totalReaders=3;

$(document).ready( function() {
	data=new Array();
	
	new Reader(
			"http://s3.amazonaws.com/logtrust-static/test/test/data3.json",
			parseCallback = function(json) {	
				var dataRegex=/([0-9]{4}-[0-9]{2}-[0-9]{2})/;
				var categoryRegex=/\#([^#]+)\#/;
			    $.each(json, function(idx, item) {
			    	var raw=item["raw"];
			    	var date=dataRegex.exec(raw)[1];
			    	var category = categoryRegex.exec(raw)[1];
			    	insertItem(data, category.toUpperCase(), date, parseFloat(item["val"]));
				});			    			    
			},
			checkAllFinished
	).read();	
	
	
	new Reader(
			"http://s3.amazonaws.com/logtrust-static/test/test/data2.json",
			parseCallback = function(json) {
			    $.each(json, function(idx, item) {
			    	insertItem(data, item["categ"].toUpperCase(), item["myDate"], parseFloat(item["val"]));
				});
    
			},
			checkAllFinished
	).read();	
	
	new Reader(
			"http://s3.amazonaws.com/logtrust-static/test/test/data1.json",
			parseCallback = function(json) {
				$.each(json, function(idx, item) {	
					/* He restado un día deliberadamente para hacer que todas las fechas estuvieran en el mismo mes */
					insertItem(data, item["cat"].toUpperCase(), moment(item["d"]).format(DATE_FORMAT), parseFloat(item["value"]));					
					//insertItem(data, item["cat"].toUpperCase(), moment(parseInt(item["d"])-(30*24*60*60*1000)).format(DATE_FORMAT).toString(), parseFloat(item["value"]));
				});
	    
			},
			checkAllFinished
	).read();	

});



function generatePieChart(data) {
	var series=new Array();
	for (category in data) {
		var value= 0;
		for (strDate in data[category]) {
			value+=data[category][strDate];
		};
		series.push({name: category, y: value});
		
	};
	
	$('#graph2').highcharts({
		chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Gráfica 2'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Valor',
            colorByPoint: true,
            data: series
        }]
	});
}

function generateLinearGraph(data) {
	var series=new Array();
	for (category in data) {
		var values= new Array();
		for (strDate in data[category]) {
			var date=moment(strDate,DATE_FORMAT);
			values.push({x:Date.UTC(date.year(), date.month(), date.date()), y:data[category][strDate]});
		};
		values.sort(function(a, b) {
		    return a.x - b.x;
		});
		series.push({name: category, data: values});
		
	};
	
	$('#graph1').highcharts({
        title: {
            text: 'Gráfica 1'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',	 
            title: {
                text: 'Fecha'
            }
        },
        yAxis: {
            title: {
                text: 'Valor'
            },
            min: 0
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        tooltip: {
        	headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%d-%m-%Y}: {point.y:.2f}'
        },

        series: series
    });
}



function checkAllFinished() {
	finished++;
	if (finished==totalReaders) {
		generateLinearGraph(data);
		generatePieChart(data);	
	}
}


function insertItem(data, category, strDate, value) {
	if (data[category]==null) {
		data[category]=[];
		data[category][strDate]=value;
	} else if (data[category][strDate]==null) {
		data[category][strDate]=value;
	} else {
		data[category][strDate]+=value;
	}
}

function showError(xhr) {
	console.log(xhr);
}


