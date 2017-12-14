

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDbQwI_STQuHmAszatHOc-6FsXi7oqIAHI",
    authDomain: "goirish-82caa.firebaseapp.com",
    databaseURL: "https://goirish-82caa.firebaseio.com",
    projectId: "goirish-82caa",
    storageBucket: "goirish-82caa.appspot.com",
    messagingSenderId: "663395509198"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();
//__________________________________________________________________

    // Initial Values
    var name = "";
    var destination = "";
    var time = 0000;
    var frequency = 00;


    // Add train to polar express "on click function"
    $("#add-train").on("click", function() {
      // prevent page from refreshing 
      event.preventDefault();

      // define inputs 
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      time = moment($("#time-input").val().trim(), "HH:mm").format();
      frequency = parseInt($("#frequency-input").val().trim());
//__________________________________________________________________

    var newTrain = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  }

  //push new train to firebase DB 
  
    database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;

  });

//Create Firebase event for adding train to the DB and a  new row in the html when the user adds an entry
//____________________________________________________________________________________________________

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into its own variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // First Train Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var differenceTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + differenceTime);

    // Time apart (remainder)
    var trainRemainder = differenceTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var trainMinutesTill = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesTill);

    // Next Train
    var nextTrain = moment().add(trainMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  // Add each train's data into the table
  $("#schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trainMinutesTill + "</td><td>" + "" + "</td></tr>");
});





