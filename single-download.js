// findPictureId is a function that returns the id of the photo on the page.
var findPictureId = function(){
  return location.search.split("fbid=")[1].split("&set")[0];
}

// downloadPictureWithId is a function that downloads a photo with a certain ID.
// id: The id of the photo desired
// callback: a function to call when the download is complete
var downloadPictureWithId = function(id, callback){

  // first, log that we are downloading the photo
  console.log("Downloading Picture With ID: " + id);

  // next, open a window with the download URL
  var downloadWindow = window.open("https://www.facebook.com/photo/download/?fbid=" + id);

  // "ran" is set to TRUE after the callback has been called. This way the
  // callback is only ran once
  var ran = false;

  // call the callback when the download tab closes...
  downloadWindow.onbeforeunload = function(){
    if (!ran) {
      ran = true;
      callback();
    }
  };

  // or if it already closed, call the callback.
  if (!downloadWindow.window) {
    if (!ran) {
      ran = true;
      callback();
    }
  }
}


downloadPictureWithId(findPictureId(), function(){console.log("Download Successful")});
