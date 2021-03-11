module.exports.getDate = getDate;

//modules like this are not installed with npm so they must be referenced with (__dirname + "/nameOfModule")


function getDate() {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    
    let day = today.toLocaleDateString('en-US', options);

return day;

}




module.exports.getDate = getDate;

function getDay() {

    let today = new Date();

    let options = {
        weekday: "long",
        
    }
    
    let day = today.toLocaleDateString('en-US', options);

return day;

}