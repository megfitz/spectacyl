// Create a pop up overlay where visitors can sign up for the
// Spectacyl beta.

var overlay = $("#overlay")
var close = $(".formCancel")
var register = $("#mc-embedded-subscribe")


$(".signup").click(function () {
	overlay.toggle();
});

$(".signupbody").click(function () {
	overlay.toggle();
	$("html, body").animate({ scrollTop: 0 }, 0);
});

close.click(function () {
  // Hide the overlay
  overlay.hide()
});

register.click(function () {
  // Hide the overlay
  overlay.hide()
});