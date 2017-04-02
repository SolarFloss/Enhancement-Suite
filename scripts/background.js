chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.storage.local.get("email",function(results){

    email = results["email"]["Email"]

    if(request.method == "getEmail"){
      sendResponse(email);
      return true;
    }else{
      sendResponse("");
      return true;
    }

    return true;

  });
  return true;
});
