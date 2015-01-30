<!-- These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
    //               alert('auth.login event');
                   });

FB.Event.subscribe('auth.logout', function(response) {
     //              alert('auth.logout event');
                   });

FB.Event.subscribe('auth.sessionChange', function(response) {
     //              alert('auth.sessionChange event');
                   });

FB.Event.subscribe('auth.statusChange', function(response) {
     //              alert('auth.statusChange event');
                   });

/*function getSession() {
 alert("session: " + JSON.stringify(FB.getSession()));
 }
 */
function getLoginStatus() {
    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                      alert('logged in');
                      } else {
                      alert('not logged in');
                      }
                      });
}
var friendIDs = [];
var fdata;
function me() {
    FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
           if (response.error) {
           alert(JSON.stringify(response.error));
           } else {
           var data = document.getElementById('data');
           fdata=response.data;
           console.log("fdata: "+fdata);
           response.data.forEach(function(item) {
                                 var d = document.createElement('div');
                                 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                 data.appendChild(d);
                                 });
           }
           var friends = response.data;
           console.log(friends.length);
           for (var k = 0; k < friends.length && k < 200; k++) {
           var friend = friends[k];
           var index = 1;
           
           friendIDs[k] = friend.id;
           //friendsInfo[k] = friend;
           }
           console.log("friendId's: "+friendIDs);
           });
}

function logout() {
    FB.logout(function(response) {
              alert('logged out');
              });
}
function handleStatusChange(response) {
    if (response.authResponse) {
        //console.log(response);
        updateUserInfo(response);
    } else {
        console.log(response);
    }
}
function updateUserInfo(response) {
    FB.api('/me',
           {fields:"name,first_name,picture,birthday"},
           function(response) {
           //console.log(response);

           });
}
var fbEmail;
var fbUserName;
function facebook_login() {
    Lungo.Notification.show();
    FB.login(
             function(response) {
             if (response.status == "connected") {
             FB.api("/me",  function(response) {
                    if (response.error) {
                    console.log(response.error);
                    }
                    else {  //first_name":"Jin","last_name
                    //console.log(response);
 
                    console.log(response.email);
                    console.log(response.name);
                    //fbEmail = response.email;
                    //fbUserName = response.name;
                    //App.user().addFBUser();
                    $("#signup-user_name").val(response.name);
                    $("#signup-emailadd").val(response.email);
                    Lungo.Notification.hide();
                    Lungo.Router.section("signup-email");
                    //FB.getLoginStatus(handleStatusChange);
                    
                    }
                    });
             }
             else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
}


function facebookWallPost() {
    console.log('Debug 1');
    var params = {
    method: 'feed',
    name: 'Facebook Dialogs',
    link: 'https://developers.facebook.com/docs/reference/dialogs/',
    picture: 'http://fbrell.com/f8.jpg',
    caption: 'Reference Documentation',
    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    };
    console.log(params);
    FB.ui(params, function(obj) { console.log(obj);});
}

function publishStoryFriend() {
    randNum = Math.floor ( Math.random() * friendIDs.length );
    
    var friendID = friendIDs[randNum];
    if (friendID == undefined){
        alert('please click the me button to get a list of friends first');
    }else{
        console.log("friend id: " + friendID );
        console.log('Opening a dialog for friendID: ', friendID);
        var params = {
        method: 'feed',
        to: friendID.toString(),
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        };
        FB.ui(params, function(obj) { console.log(obj);});
    }
}

document.addEventListener('deviceready', function() {
                          try {
                    //      alert('Device is ready! Make sure you set your app_id below this alert.');
                          FB.init({ appId: "640347902668986", nativeInterface: CDV.FB, useCachedDialogs: false });
                     //     document.getElementById('data').innerHTML = "";
                          } catch (e) {
                          alert(e);
                          }
                         
                         var myVar = setInterval(function(){checkConnection()}, 5000);
                          }, false);
