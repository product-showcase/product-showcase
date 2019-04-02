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


var database = firebase.database();



var ref = database.ref('pic-num');

var data = {
    name: "DTS",
    score: 43
}

ref.push(data);

//afeawefawfewaf