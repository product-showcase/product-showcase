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
    database.ref('posts').push(newItem);

    alert("Item successfully added");

    // Clears all of the text-boxes
    $("#item-name").val("");
    $("#description").val("");
    $("#website-link").val("");
    $("#item-image").val("");
});

// 3. Create Firebase event for adding item to the database and a row in the html when a user adds an entry
database.ref('posts').on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var itemName = childSnapshot.val().name;
    var itemDesc = childSnapshot.val().desc;
    var itemWebLink = childSnapshot.val().webLink;
    var itemImage = childSnapshot.val().image;

    var newDiv = $("<div class='card'>");

    var newDivCard = $("<div class='card-image waves-effect waves-block waves-light'>");
    var newImage = $("<img class='activator card-pic' src='" + itemImage + "'>");

    var newCardContent = $("<div class='card-content'>");
    var newTitle = $('<span class="card-title activator grey-text text-darken-4">' + itemName + '<i class="material-icons right">more_vert</i></span>');

    var newLink = $("<a class='link' href='http://" + itemWebLink + "'>");
    newLink.text(itemWebLink);

    var newReveal = $("<div class='card-reveal'>");
    var newCardTitle2 = $("<span class='card-title grey-text text-darken-4'>" + itemName + "<i class='material-icons right'>close</i></span>");
    var newPTag = $("<p>");
    newPTag.text(itemDesc);

    var deleteItem = $("<a class='waves-effect waves-light btn-small delete-item'>Delete</a>");

    newDiv.append(newDivCard, newCardContent, newLink, deleteItem, newReveal);
    newDivCard.append(newImage);
    newCardContent.append(newTitle);
    newReveal.append(newCardTitle2, newPTag);
    $('#cards').append(newDiv);

    deleteItem.on("click", function (event) {
        event.preventDefault();
    
        database.ref('posts/'+itemName).remove();
    })
});
<<<<<<< HEAD

$(".delete-item").on("click", function (event) {
    event.preventDefault();
    console.log("delete");
})
=======
>>>>>>> f82365bfe80e8539bbc32b587f4cf3a0681249a2
