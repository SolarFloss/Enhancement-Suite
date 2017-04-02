
var list = ["dog","cat","shirt","phone","sprite","fork","bottle"];
var occurence = [];
var storage = chrome.storage.sync;
var local = chrome.storage.local;

//Bubble sort
function sort(){
  //console.log(occurence);
  for(var i = 0;i < occurence.length;i++){
    for(var j = 0;j < occurence.length - i - 1;j++){
      //console.log((occurence[j]).substring(1));
      //console.log(occurence[j].substring(0,occurence));
      if(Number(occurence[j].substring(0,occurence[j].indexOf(" "))) < Number(occurence[j+1].substring(0,occurence[j+1].indexOf(" ")))){
        var temp = occurence[j];
        occurence[j] = occurence[j+1];
        occurence[j+1] = temp;
      }
    }
  }
  console.log(occurence);
  populate();
}

chrome.storage.onChanged.addListener(function(){
  location.reload();
});

function populate(){
  //storage.clear();
  //(occurences * 1000)/max occurences;
  var r = 25;
  var g = 50;
  var b = 255;
  var max = 0;


  max = occurence[0].substring(0,occurence[0].indexOf(" "))
  console.log(max);

  for(var i = 0;i < occurence.length;i++){

      width = (occurence[i].substring(0,occurence[i].indexOf(" "))*1000)/max;


    b -= 50;

    //console.log(width);
    //console.log(occurence[i].substring(0,occurence[i].indexOf(" ")));

    //console.log(occurence.length);

    var newDiv = document.createElement('div');
    var testDiv = document.createElement('div');
    testDiv.style.position = "absolute";
    //testDiv.style.backgroundColor = "#3c3f42"
    testDiv.style.width = "100%";
    testDiv.style.height = "100px";

    newDiv.id = 'measure';
    newDiv.style.paddingLeft = "5px";
    newDiv.style.overflow = "hidden";
    newDiv.style.backgroundColor = "rgb(" + [r,g,b].join(',') + ')';
    newDiv.style.width = width+"px";
    newDiv.style.height = "100px";
    newDiv.style.paddingTop = "10px";
    newDiv.style.fontSize = "55px";
    newDiv.style.color = "white";
    //newDiv.innerHTML = occurence[i].substring(0,occurence[i].indexOf(" ")) + " " + occurence[i].substring(occurence[i].indexOf(" "));
    document.getElementsByTagName('body')[0].appendChild(newDiv);
    testDiv.innerHTML = occurence[i].substring(0,occurence[i].indexOf(" ")) + " " + occurence[i].substring(occurence[i].indexOf(" "));
    newDiv.appendChild(testDiv);

    var space = document.createElement('div');
    space.style.width = width + "px";
    space.style.height = "10px"
    document.getElementsByTagName('body')[0].appendChild(space);

  }
}


document.addEventListener('DOMContentLoaded', function() {
  run();
});


function run(){
  storage.get("emails",function(results){
    console.log(results);
    words = results["emails"].Words;
    for(var i = 0;i < list.length;i++){
      var count = 0;
      for(var j = 0;j < words.length; j++){
        if(list[i] === words[j]){
          count++;
        }
      }
      occurence.push(count+" "+ list[i]);

      //occurence[list[i]] = count;
    }

    sort();
    //results["emails"].Words.push(baddy);
    //console.log(results["emails"].Words);
  });
}
