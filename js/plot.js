var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var pointLabels = [];


// Load the graph - need to figure out how to reduce that 3s delay (currently needed so that all of the firebase data loads before the graph
// does otherwise the js will fail)
setTimeout(function() {
	sorting();
	mergeData();	
	plotpoints();
}, 3000);

function labels() {
	for (i in $actData) {
		for (j in $data) {
			if ($.inArray($actData[i][0], $data[j]) === 0) {

			} 
		}
	}
}

// Organize the data by date so it plots it in order
function sorting() {
	$data.sort(function (a, b) {
			if (a[0] === b[0]) {return 0;}
			if (a[0] > b [0])
			{
				return 1;
			} else {
				return -1
			}
		});

	$actData.sort(function (a, b) {
			if (a[0] === b[0]) {return 0;}
			if (a[0] > b [0])
			{
				return 1;
			} else {
				return -1
			}
		});
};


// Merge the two data sets to create the labels for the graph

function mergeData (date, name, type){
	for (i in $data) {
		var labelDate = $data[i][0]
		for (j in $actData) {
			var isTrue = $.inArray(labelDate, $actData[j]);
			if (isTrue === 0) {
				var labelName = $actData[j][1];
				var labelType = $actData[j][2];
			};
			if (typeof labelName === undefined) {
				var labelName = null;
				var labelType = null;
			};
		};
		var newLabel = new Array(labelName);
		pointLabels.push(newLabel);
		var labelName = undefined;
		var labelType = undefined;
	};
return pointLabels;
};

// Actual plotting function
function plotpoints() {
	$(function() {
		var plot = $.plot($("#chartDisplay"), 
			[ { data: $data} ], {
	        xaxis: {
	            min: (new Date($data[0][0])).getTime(),
	            //max: (new Date($data[0][0])).getTime(),
	            mode: "time",
	            tickSize: [1, "day"],
	            tickLength: 0,
	            axisLabel: 'Date',
	            axisLabelUseCanvas: true,
	            axisLabelFontSizePixels: 12,
	            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
	            axisLabelPadding: 5
	        },
	        yaxis: {
	            axisLabel: 'Registrations',
	            axisLabelUseCanvas: true,
	            axisLabelFontSizePixels: 12,
	            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
	            axisLabelPadding: 5
	        },
	        series: {
				color: {
					color: '#058DC7'
				},
	            lines: { 
					show: true,
				},
	            points: {
					show: true,
	                radius: 3,
	                fill: true,
					symbol: "circle", 
					fillColor: "#058DC7"
	            },
				// The labels for the marketing activities at each point.
				showLabels: true,
				labels: pointLabels,
				labelPlacement: "above", 
				labelClass: "activityLabels"
	        },
	        grid: {
	            hoverable: true,
				clickable: true,
	            borderWidth: 1 
	        },
			tooltip: true,
			tooltipOpts: {
				content: "Date: %x <br> Count: %y"
			},
	        legend: {
	            labelBoxBorderColor: "none",
	            position: "right"
	        }
	    });

	});
};
