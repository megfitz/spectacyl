// Allow someone to post a new marketing activity that they have
// completed for their company.

var ref = new Firebase("https://spectacyl-users.firebaseio.com");

// When the button is pressed
$(".postButton").click(function () {
	// Display the form
	$(this).next().toggle();
	});

// When the submit button is pressed on the form
$(".submitButton").click(function () {
	// Capture all of the form field values
	var $activityName = $("#activityName").val();
	var $activityType = $("#activityType").val();
	var $activityDate = $("#activityDate").val();
	var $activityDescription = $("#activityDescription").val();

	// Set the data to the Firebase database
	ref.push({name: $activityName, type: $activityType, date: $activityDate, description: $activityDescription});	
});

// For each child element in the Firebase database
ref.on('child_added', function (snapshot) {
	// Save all of the information in a variable
	var post = snapshot.val();
	// Execute a function to display this information
	displayActivities(post.name, post.date, post.type, post.description);
	//storeActivities(post.name, post.date, post.type);
	var $actData = storeActivities(post.name, post.date, post.type);
});

// Function to display the data from each Firebase child
function displayActivities(name, date, type, description) {
	// Create HTML elements for each of the different types of data
	var $newPost = $('<div class="post"></div>');
	var $newPostName = $('<p class="postName"></p>');
	var $newPostDate = $('<p class="postDate"></p>');
	var $newPostType = $('<p class="postType"></p>');
	var $newPostDescription = $('<p class="postDescription"></p>');
	// Append the correct data to the HTML elements from Firebase and
	// then append that new HTML element to the correct place in the code
	$newPostName.text(name);
	$newPost.append($newPostName);
	$newPostType.text(type);
	$newPost.append($newPostType);
	$newPostDate.text(date);
	$newPost.append($newPostDate);
	$newPostDescription.text(description);
	$newPost.append($newPostDescription);
	$("#posts").append($newPost);
};


function storeActivities(name, date, type) {
	//Create an array of all of the data points
	if (typeof $actData === 'undefined') {
		$date = new Date(date);
		$point = new Array($date.getTime(), name, type)
		$actData = [$point]
	} else {
		$date = new Date(date);
		$point = new Array($date.getTime(), name, type)
		$actData.push($point);
	}
	return $actData
};