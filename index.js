const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;
const ejs = require('ejs');
const path = require('path');
const _ = require('lodash');
const date = require(__dirname + '/date.js');
const getFileAge = require(__dirname + '/fileUpdateCheck.js')
const AtcsObj = require(__dirname + '/atcsDisplay.js');

//const bootstrapIcons = require('bootstrap-icons');




app.set('view engine', 'ejs');

app.use(express.static('public'));



//Code to manipulate the given server status
let serverOnlineStatus = true;

function updateStatus()  {
 if (serverOnlineStatus == true) {
   return "ONLINE"
 } else {
   return "OFFLINE"
 }
}


//Req
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', (req, res) => {
  res.render('home', {
    //dynamic content objects pushed here to ejs page.
    
      serverStatus: "ONLINE"
    
    
  });
});


//reference to atcs generated objects to display
let atcsDisplays = [];


//atcs object used to popluate data for display
class atcsDisplay {
  constructor(displayId, subdivision, description, imageSrc, serverStatus) {
    this.displayId = displayId;
    this.description = description;
    this.subdivision =subdivision;
    this.imageSrc = imageSrc;
    this.serverStatus = serverStatus;
  }


  //Returns a server icon that is red or green with server status. The server icon is either red or green depending on availbility. 
    serverStatusIconColor() {
      if (this.serverStatus == true) {
        // return 'style="color: green;"'
        return 'green;'

      } else {
        return 'red;'
        // return '<i class="bi bi-server" style="color: reds;"</i>'
      }
    }
  
}



//TODO need to autopopulate the server status color
//displayid, subdivision, description, imagesrc, serverStatus
let cnDisplay = new atcsDisplay( "CN_D1","CN Waukesha Sub","CN Waukesha Subdivision Dispatcher Display." ,"/expiredDispatchDisplay.jpg", true);
atcsDisplays.push(cnDisplay);

let cpDisplay = new atcsDisplay( "CP_D1","CP Watertown Sub","CP Watertown Subdivision Dispatcher Display." ,"/expiredDispatchDisplay.jpg", true);
atcsDisplays.push(cpDisplay);

let upDisplay = new atcsDisplay( "UP_D1","UP Milwaukee Sub","UP Milwaukee Subdivision Dispatcher Display." ,"/expiredDispatchDisplay.jpg", false);
atcsDisplays.push(upDisplay);


let upTestDisplay = new AtcsObj("UP_D1test","UP Milwaukee Sub","UP Milwaukee Subdivision Dispatcher Display." ,"/expiredDispatchDisplay.jpg", true);
atcsDisplays.push(upTestDisplay);

console.log(atcsDisplays)

app.get('/bstrp4', (req, res) => {
  res.render('bstrp4', {
    //dynamic content objects pushed here to ejs page.
    displays : atcsDisplays,
    serverStatus: updateStatus()
  });
});


app.get('/dispatchDisplay', (req, res) => {
  // res.render('dispatchDisplay')
  res.render('dispatchDisplay', {
    dispatchDisplayImage: cnDisplay.imageSrc,
    dispatchDisplayContent: cnDisplay.description,
    dispatchDisplayServerStatus: cnDisplay.serverStatusIconColor()
    //dispatchDisplayServerStatus: cnDisplay.serverStatusIcon()
  })


});





//TODO render dispatch display based upon the requested object.
//Use express route parameters
/*

Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})



*/

app.get('/displays/:displayId', (req, res) => {

  console.log(req.params.displayId)
  const requestedDisplay = _.lowerCase(req.params.displayId);

  console.log(requestedDisplay)
    
   atcsDisplays.forEach( function(atcsId) {

    const arrayStoredAtcsId = _.lowerCase(atcsId.displayId);

        if (  arrayStoredAtcsId === _.lowerCase(atcsId.displayId )   ) {

          //console.log("found a match")
            res.render('dispatchDisplay', {
              dispatchDisplayImage: atcsId.imageSrc,
              dispatchDisplayContent: atcsId.description,
              dispatchDisplayServerStatus: atcsId.serverStatusIconColor()
              
            })

        } else {

          res.render('bstrp')
          console.log("No match for /")
        }


          // res.render('dispatchDisplay', {
          //   dispatchDisplayImage: cnDisplay.imageSrc,
          //   dispatchDisplayContent: cnDisplay.description,
          //   dispatchDisplayServerStatus: cnDisplay.serverStatusIconColor()
          //   //dispatchDisplayServerStatus: cnDisplay.serverStatusIcon()







   } //loop for each item







   ) //for each






   });


 

          // res.render('dispatchDisplay', {
          //   dispatchDisplayImage: cnDisplay.imageSrc,
          //   dispatchDisplayContent: cnDisplay.description,
          //   dispatchDisplayServerStatus: cnDisplay.serverStatusIconColor()
          //   //dispatchDisplayServerStatus: cnDisplay.serverStatusIcon()
   


/*

const requestedDisplay = _.lowerCase(req.params.displayId);

    atcsDisplays.forEach(function(atcsId) {
    const arrayStoredAtcsId = _.lowerCase(atcsId.displayId);

        if (arrayStoredAtcsId === _.lowerCase(atcsId.displayId)  {

          res.render('dispatchDisplay' , {
            dispatchDisplayImage: atcsId.imageSrc,
            dispatchDisplayContent: atcsId.description,
            dispatchDisplayServerStatus: atcsId.serverStatusIconColor()
          });

        }
    }




*/
















io.on('connection', function (socket) {
  console.log('connecting user: ' + socket.id);
  fs.readFile('public/image.jpg', function (err, data) {
    console.log(err);
    socket.emit('imageConversionByClient', { image: true, buffer: data });
    socket.emit(
      'imageConversionByServer',
      'data:image/png;base64,' + data.toString('base64')
    );
  });
});

// http.listen(3000, function () {
//   console.log('listening on *:3000');
// });


let imagePath = __dirname + "/public/image.jpg"






setInterval(function(){ 


//console.log("called");

//getFileAge.logAgeOfFileAt(imagePath);
//getAgeOfFileAt(imagePath);

//getFileAge.getAgeOfFileSt


}, 5000);





http.listen(process.env.PORT || 8080, function () {
  console.log('Server started on port 8080');
});
