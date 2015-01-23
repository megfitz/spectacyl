$("#wrapper").hide()

var URL = null
var ref = new Firebase("https://spectacyl-users.firebaseio.com");

//
// NEW USER REGISTRATION AND LOGIN
//

// When the submit button is pressed on the form
$("#register").click(function (register) {
  // Capture all of the form field values
  var $userEmail = $("#registerEmail").val();
  var $userPassword = $("#registerPassword").val();

  // Prevent the submit button from reloading the page before the user is created
  register.preventDefault();
  
  // And send that data to firebase to create a new user profile
  newUser($userEmail, $userPassword);
  
  // Ensure there's enough time for the user to get created
  setTimeout(function() {
  // Log in the user by authorizing them
  existingUser($userEmail, $userPassword);
}, 200);

  // Clear the form fields so the user is aware that something has happened
  $("input[type=email], textarea").val("");
  $("input[type=password], textarea").val("");

  // window.location.replace("http://www.spectacyl.com/app.html")
});


// Or login as an existing user
$("#login").click(function (login) {
  // Capture all of the form field values
  var $userEmail = $("#loginEmail").val();
  var $userPassword = $("#loginPassword").val();

  // Prevent the submit button from reloading the page before the user is created
  login.preventDefault();
  
  // Log in the user by authorizing them
  existingUser($userEmail, $userPassword);
  
  // Clear the form fields so the user is aware that something has happened
  $("input[type=email], textarea").val("");
  $("input[type=password], textarea").val("");

  // window.location.replace("http://www.spectacyl.com/app.html")
});

// Function to send the new user data to Firebase
function newUser(email, password) {
  ref.createUser({
    email: email,
    password: password
    }, function(error) {
      if (error === null) {
      console.log("User created successfully");
    } else {
      console.log("Error creating user:", error);
    }
  });
};

// Function to authorize existing users
function existingUser(email, password) {
    ref.authWithPassword({
    email    : email,
    password : password
  }, function(error, authData) {
    if (error === null) {
      // user authenticated with Firebase
      console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
      window.userID = authData.uid;
      alert(userID);
      $("#allLoginOptions").hide()
      $("#wrapper").show()
      var str = userID
      str = str.substring(str.indexOf(":") + 1);
      URL = "https://spectacyl-users.firebaseio.com" + "/users/" + str;
      ref = new Firebase(URL);
    } else {
      console.log("Error authenticating user:", error);
    }
  });
};

