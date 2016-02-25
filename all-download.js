var pause = false;

(function(){
var hasPictureId = function(){
  return location.search.contains("fbid=");
};

var findPictureId = function(){
  return location.search.split("fbid=")[1].split("&set")[0];
}

var downloadPictureWithId = function(id, callback){
  console.log("downloadPictureWithId");
  var downloadWindow = window.open("https://www.facebook.com/photo/download/?fbid=" + id);
  var ran = false;

  downloadWindow.onbeforeunload = function(){
    if (!ran) {
      ran = true;
      callback();
    }
  };

  if (!downloadWindow.window) {
    if (!ran) {
      ran = true;
      callback();
    }
  }
}

var advanceToNextPicture = function(){
  console.log("advanceToNextPicture");
  while ($("[title='Next']").length == 0) {
    console.log("no next button!!");
    wait(1000);
  }
  $("[title='Next']")[0].click();
}

var loopDownload = function(stopId, maxLoops){
  // if (!pause)
  // setTimeout(function(){
    if (maxLoops && maxLoops > 0) {
      if (hasPictureId()) {
        var currentId = findPictureId();
        if (stopId != currentId) {
          downloadPictureWithId(currentId, function(){
            setTimeout(function(){
              advanceToNextPicture();
              setTimeout(function(){
                loopDownload(stopId, maxLoops - 1);
              }, 1000);
            }, 1000);
          });
        } else {
          console.log("Done Downloading ... looped back to first id");
        }
      } else {
        console.log("Skipping Media ... no picture id found");
        advanceToNextPicture();
        setTimeout(function(){
          loopDownload(stopId, maxLoops - 1);
        }, 1000)
      }
    } else {
      console.log("Done Downloading ... hit max loop count");
    }
  // }, 2000);
}

loopDownload(null, 10000);
})();
