var config = {
    apiKey: "AIzaSyAaz1sEdtmTUrBUWaC0dCr_cLDWTZDZa0Y",
    authDomain: "myawesomeapp-75af1.firebaseapp.com",
    databaseURL: "https://myawesomeapp-75af1.firebaseio.com",
    projectId: "myawesomeapp-75af1",
    storageBucket: "myawesomeapp-75af1.appspot.com",
    messagingSenderId: "36009876719"
};
firebase.initializeApp(config);
var database = firebase.database();

// add database below//
// 2. Button for adding items
$("#add-item").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var itemName = $("#item-name").val().trim();
    var itemDesc = $("#description").val().trim();
    var itemWebLink = $("#website-link").val().trim();
    var itemImage = $("#item-image").val().trim();

    // Creates local "temporary" object for holding item data
    var newItem = {
        name: itemName,
        desc: itemDesc,
        webLink: itemWebLink,
        image: itemImage
    };

    // Uploads item data to the database
    database.ref().push(newItem);

    // Logs everything to console
    console.log(newItem.itemName);
    console.log(newItem.itemDesc);
    console.log(newItem.itemWebLink);
    console.log(newItem.itemImage);

    alert("Item successfully added");

    // Clears all of the text-boxes
    $("#item-name").val("");
    $("#description").val("");
    $("#website-link").val("");
    $("#item-image").val("");
});

// 3. Create Firebase event for adding item to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var itemName = childSnapshot.val().name;
    var itemDesc = childSnapshot.val().desc;
    var itemWebLink = childSnapshot.val().webLink;
    var itemImage = childSnapshot.val().image;

    // Item Info
    console.log(itemName);
    console.log(itemDesc);
    console.log(itemWebLink);
    console.log(itemImage);
    
});

var database = firebase.database();



var ref = database.ref('pic-num');

var data = {
    name: "DTS",
    score: 43
}

ref.push(data);