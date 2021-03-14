const fs = require('fs');

module.exports.logAgeOfFileAt = logAgeOfFileAt;




function logAgeOfFileAt(pathLoc) {
    let path = pathLoc;
    
    let fileLastModDate = (function ()  {
      const stats = fs.statSync(path)
      return stats.mtime
    })();
    // console.log("fucn date: " + fileLastModDate)
    let currentDateNow = Date.now();
    
    let fileLastModSince1970 = fileLastModDate.getTime();
    
    let ageDiffInMilSecs = currentDateNow - fileLastModSince1970;
    
    let ageReadeable = ( function ()  {
      const seconds = Math.floor((ageDiffInMilSecs / 1000) % 60);
      const minutes = Math.floor((ageDiffInMilSecs / 1000 / 60) % 60);
      const hours = Math.floor((ageDiffInMilSecs  / 1000 / 3600 ) % 24)
    
      const humanized = [
        (hours.toString()),
        (minutes.toString()),
        (seconds.toString()),
      ].join(':');
    
      return humanized;
    })();
    
    
    console.log( "H:M:S :" + ageReadeable);
    
    };



    module.exports.getFileAgeAt = getFileAgeAt;

    function getFileAgeAt(pathLoc) {
        let path = pathLoc;
        
        let fileLastModDate = (function ()  {
          const stats = fs.statSync(path)
          return stats.mtime
        })();
        // console.log("fucn date: " + fileLastModDate)
        let currentDateNow = Date.now();
        
        let fileLastModSince1970 = fileLastModDate.getTime();
        
        let ageDiffInMilSecs = currentDateNow - fileLastModSince1970;
        
        let ageReadeable = ( function ()  {
          const seconds = Math.floor((ageDiffInMilSecs / 1000) % 60);
          const minutes = Math.floor((ageDiffInMilSecs / 1000 / 60) % 60);
          const hours = Math.floor((ageDiffInMilSecs  / 1000 / 3600 ) % 24)
        
          const humanized = [
            (hours.toString()),
            (minutes.toString()),
            (seconds.toString()),
          ].join(':');
        
          return "H:M:S :" + humanized;
        })();
        
        };
    