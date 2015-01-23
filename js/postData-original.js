// Allow someone to post a new metric on a particular date
// and also pull all data points from Firebase to store in a 
// data set to be used in future plotting.

// Set up the Firebase instance
var userData = new Firebase('https://spectacyl-data.firebaseio.com/');

// When the button is pressed
$("#addNew").click(function () {
	// Display the form
	$(this).next().toggle();
	});

// When the submit button is pressed on the form
$(".submitDataButton").click(function () {
	// Capture all of the form field values
	var $dataDate = $("#dataDate").val();
	var $dataCount = $("#dataCount").val();

	// Set the data to the Firebase database
	userData.push({date: $dataDate, count: $dataCount});	
});

// For each child element in the Firebase database
function pull () {
	userData.on('child_added', function (snapshot) {
		// Save all of the information in a variable
		var data = snapshot.val();
		// Execute a function to display this information
		displayData(data.date, data.count);
	});
}

function displayData(date, count) {
	//Create an array of all of the data points
	if (typeof $data === 'undefined') {
		$date = new Date(date);
		$point = new Array($date.getTime(), count)
		$data = [$point]
	} else {
		$date = new Date(date);
		$point = new Array($date.getTime(), count)
		$data.push($point);
	}
	return $data
};

var $data = pull();