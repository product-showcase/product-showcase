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


function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
    function writeNewPost(uid, username, picture, title, body) {
        // A post entry.
        var postData = {
            author: username,
            uid: uid,
            body: body,
            title: title,
            starCount: 0,
            authorPic: picture
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);
    }
}
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
database.ref('posts').on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var itemName = childSnapshot.val().name;
    var itemDesc = childSnapshot.val().desc;
    var itemWebLink = childSnapshot.val().webLink;
    var itemImage = childSnapshot.val().image;
    // <div class="card">
    //     <div class="card-image waves-effect waves-block waves-light">
    //         <img class="activator" src="./assets/images/gifts.jpg">
    //     </div>
    //     <div class="card-content">
    //         <span class="card-title activator grey-text text-darken-4">Card Title<i
    //                 class="material-icons right">more_vert</i></span>
    //         <p><a href="#">This is a link</a></p>
    //     </div>
    //     <div class="card-reveal">
    //         <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
    //         <p>Here is some more information about this product that is only revealed once clicked on.</p>
    //     </div>
    // </div>

    var newDiv = $("<div class='card'>");

    var newDivCard = $("<div class='card-image waves-effect waves-block waves-light'>");
    var newImage = $("<img class='activator' src='" + itemImage + "'>");

    var newCardContent = $("<div class='card-content'>");
    var newTitle = $('<span class="card-title activator grey-text text-darken-4">' + itemName + '<i class="material-icons right">more_vert</i></span>');

    var newPLink = $("<a href='" + itemWebLink + "'>");
    newPLink.text('Website');

    var newReveal = $("<div class='card-reveal'>");
    var newCardTitle2 = $("<span class='card-title grey-text text-darken-4'>" + itemName + "<i class='material-icons right'>close</i></span>");
    var newPTag = $("<p>")
    newPTag.text(itemDesc);

    newDiv.append(newDivCard, newCardContent, newPLink, newReveal);
    newDivCard.append(newImage);
    newCardContent.append(newTitle);
    newReveal.append(newCardTitle2, newPTag);
    $('#cards').append(newDiv);

});