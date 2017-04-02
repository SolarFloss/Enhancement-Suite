var background = chrome.extension.getBackgroundPage();
var storage = chrome.storage.sync;
var local = chrome.storage.local;



/*
var newGame = {};
newGame["Name"] = gameName;
newGame["Players"] = [];
newGame.Players.push(userName);
newGame["Start"] = "Chocolate";
newGame["End"] = "United States";

var localData  = {};
localData["Username"] = userName;
localData["Page"] = "Democracy";
localData["Game"] = gameName;
b

local.set({[userName] : localData});
storage.set({[gameName] : newGame});
background.console.log("Game created");
*/


document.addEventListener('DOMContentLoaded', function() {
  background.console.log("hi");
  var storage = chrome.storage.sync;
//storage.clear();
  local.get("email",function(results){
    console.log(results["email"]["Email"]);
  });

  document.getElementById('submit').addEventListener('click',function(){
    var email = document.getElementById("email").value;
    storage.get(email,function(results){
      //console.log(results[email]);
      if(results[email] == undefined){
        console.log("Creating new account");
        var newAccount = {};
        newAccount["Email"] = email;
        newAccount["Refresh"] = "weekly";
        newAccount["Words"] = [];

        storage.set({"emails" : newAccount});
        local.set({"email" : newAccount});
        console.log("done");
      }else{
        console.log("email taken");
      }
    });

    document.getElementById('options').addEventListener('click',function(){
      console.log("hello");
      chrome.runtime.openOptionsPage();
    });
  });
});




/*
Game Structure:
    Storage:
      Game1{name: "cool", players = [], Start: "Bananas", End: "United States"}
      Game2{name: "hello", players = [], Start: "Skittles", End: "United States"}

*/


/*
Player Data Structure:
    Storage:
      Data{
      Name: "Solar",
      Page: "Democracy",
      Game: "gameName",
    }




document.addEventListener('DOMContentLoaded', function() {
  //background.console.log(chrome.extension.getViews()[1]);
  //background.console.log(chrome.extension.getBackgroundPage());

    document.getElementById('btnNewGame').addEventListener('click', function() {
      var gameName = document.getElementById("gameName").value;
      var userName = document.getElementById("userName").value;

      //Random number
      var randomID = (Date.now().toString(36) + Math.random().toString(36).substring(2, 5)).toUpperCase();

      storage.get(gameName,function(results){
        if(results[gameName] == undefined){
          background.console.log("Creating new game");

          var newGame = {};
          newGame["Name"] = gameName;
          newGame["Players"] = [];
          newGame.Players.push(userName);
          newGame["Start"] = "Chocolate";
          newGame["End"] = "United States";

          var localData  = {};
          localData["Username"] = userName;
          localData["Page"] = "Democracy";
          localData["Game"] = gameName;


          local.set({[userName] : localData});
          storage.set({[gameName] : newGame});
          background.console.log("Game created");

        }else{
          background.console.log("That name is taken");
        }
      });

    });


    //Joining a created game
    document.getElementById("joinGame").addEventListener("click",function(){
      var gameName = document.getElementById("gameName").value;
      var userName = document.getElementById("userName").value;

      storage.get(gameName,function(results){
          if(results[gameName] != undefined){
            if(results[gameName].Players.indexOf(userName) == -1){
              if(userName.length < 5)
                userName = (Date.now().toString(36) + Math.random().toString(36).substring(2, 5)).toUpperCase();

              background.console.log("Game found");
              var game = results[gameName];
              game.Players.push(userName);

              storage.set({[gameName] : game});
              background.console.log(userName + " joined successfully");
            }else{
              //Tell the user that the game is not available
              background.console.log("You're already in this game");
            }
          }else{
            //Tell the user that the game is not available
            background.console.log("Game not found");
          }
      });
    });
});
*/
