var config = {
    apiKey: "AIzaSyAaz1sEdtmTUrBUWaC0dCr_cLDWTZDZa0Y",
    authDomain: "myawesomeapp-75af1.firebaseapp.com",
    databaseURL: "https://myawesomeapp-75af1.firebaseio.com",
    projectId: "myawesomeapp-75af1",
    storageBucket: "myawesomeapp-75af1.appspot.com",
    messagingSenderId: "36009876719"
};
firebase.initializeApp(config);
console.log(firebase);

// add database below//
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var empName = $("#employee-name-input").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var empRate = $("#rate-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newEmp = {
        name: empName,
        role: empRole,
        start: empStart,
        rate: empRate
    };

    // Uploads employee data to the database
    database.ref().push(newEmp);

    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);

    alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;

    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(empStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});



// practice below

var database = firebase.database();



var ref = database.ref('pic-num');

var data = {
    name: "DTS",
    score: 43
}

ref.push(data);

//afeawefawfewaf