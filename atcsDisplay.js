module.exports = class AtcsDisplay {

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



//atcs object used to popluate data for display
