// $(document).ready(function () {
//     console.log("It Works")
//     $('#searchGitHubUser').on('keyup', function (e) {
//         let username = e.target.value;

//         // AJAX make a request to Github Profile page
//         $.ajax({
//             url: 'https://api.github.com/users/' + username,
//             data: {
//                 client_id: 'Iv1.b1b38b8d81dd6648',
//                 client_secret: '730512ea331b051a96f9d738c2ea58f438ffa2ee'
//             }
//         }).done(function (user) {
//             console.log(user)
//             $('#githubProfile').html(`
//           <div class="panel panel-default">
//             <div class="panel-heading">
//             <h3 class="panel-title">${user.name}</h3>
//             </div>
//             <div class="panel-body">
//               <div class="row">
//                 <div class="col-md-3">
//                   <img class="thumbnail avatar" src="${user.avatar_url}">
//                 </div>
//                 <div class="col-md-9">
//                 </div>
//               </div>
//             </div>
//           </div>

//         `);
//         });
//     });
// });


// api key and secret 
key = "2ffa68ae96bbb301ae93e26111d5a009b3d94458fa51a0d72e81bd35ee7469ac"
secret = "5da32eb8b66a0b31866bad513a60b939b1c7a6081e4400facb7ebbd855fe4762"

var base_url = "https://api.producthunt.com/v1/"
var token_url = base_url + "oauth/token"
var today_post_url = base_url + "posts"


function get_token() {
  var token = '';

  $.ajax({
    url: token_url,
    type: "POST",
    async: false,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "client_id": key,
      "client_secret": secret,
      "grant_type": 'client_credentials'
    },
    success: (function (res) {
      token = res.access_token;
    })
  });

  return (token);
}

function get_todays_posts() {
  token = get_token();
  console.log(token);

  $.ajax({
    url: today_post_url,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    success: (function (res) {
      return res;
    })
  })
}