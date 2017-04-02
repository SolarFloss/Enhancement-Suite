window.addEventListener('keyup',doKeyPress,false);
var storage = chrome.storage.sync;
//storage.clear();
var local = chrome.storage.local;
log = "";


var list = ["dog","cat","shirt","phone","sprite","fork","bottle"];

var timer = 5000;
setTimeout("filter()",timer);
//storage.clear();

function filter(){
  debounce = false;
  temp = [];
  for(var i = 0;i < list.length; i++){
    baddies = "";
    b = "";
    e = "";
    right = true;
    left = true;
    li = 1;
    ri = 0;
    format = "";

    if(log.search(list[i].toUpperCase()) > -1){
      console.log(list[i]);
      //baddies += list[i];
      //console.log(list[i]);
      //alert(log.charAt(log.search(list[i])+list[i].length+1) == "");


      while(left || right){
        if(left){
        //alert(log.charAt(log.search(list[i])-li) != "");
          if(log.charAt(log.search(list[i])-li) != ""){
            //alert("so far so good");
            if(log.charAt(log.search(list[i])-li) != " "){
              //alert("okay");
              b += log.charAt(log.search(list[i])-li);
              //alert(b);
              li++;
            }else{
              left = false
            }
          }else{
            left = false;
          }
        }

        if(right){
          if(log.charAt(log.search(list[i])+list[i].length+ri) != ""){
            if(log.charAt(log.search(list[i])+list[i].length+ri) != " "){
              //alert(log.charAt(log.search(list[i])+list[i].length+ri));
              e += log.charAt(log.search(list[i])+list[i].length+ri);
              ri++;
            }else{
              right = false;
            }
          }else{
            right = false;
           }
        }
        //storage.clear();
        baddy = b.split("").reverse().join("") + list[i] + e;


        //alert(b);
        //alert(baddy);


      }
      temp.push(list[i]);

    }

    //alert(charAt(log.indexOf(list[i])-li));
  }
  log = "";


  chrome.runtime.sendMessage({method: "getEmail"}, function(response){
    //console.log(baddy);
    console.log(temp);

    var email = response;
    //console.log(list[i]);
    storage.get("emails",function(results){
      //results["emails"].Words.push(baddy);

      //console.log(results);
      var data = {}
      data.Email = email;
      data.Refresh = "weekly";
      data.Words = results["emails"].Words;
      //console.log(data.Words);
      //console.log(baddy);
      data.Words = data.Words.concat(temp);
      //console.log(data);
      if(debounce == false){
        debounce = true;
        storage.set({"emails" : data});
      }

      //local.set({"email": data});
    });
    //alert(stuff);
  });

setTimeout("filter()",timer);
}


function doKeyPress(e){
  //alert(e.keyCode);

    /*
  if(e.key != "Enter" && e.key != "Space" && e.key != "Escape"){
    words += e.key;
  }else if(e.key == "Space" || e.key == "Escape" || e.key == "Enter"){
    words += " ";
  }
    */



  if(e.key == "Space"){
    log += " ";
  }else if(e.key == "Backspace"){
    log = log.slice(0,-1);
  }else if(e.key == "Enter"){
    log += "\n";
  }else if(e.key == "Shift" || e.key == "Control"){
    //Do nothing
  }else if(e.key == "Home"){
    //console.log(log);
    //filter();
  }else{
    log += e.key.toUpperCase();
  }
}
