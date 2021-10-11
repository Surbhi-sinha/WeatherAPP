const request = require('postman-request');

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VyYmhpMjAwMiIsImEiOiJja3UzeGRhemM0OTU2MzJucTdidjdkN253In0.m3DK1H4K4NjWu_AOP4hNug&limit=1';
    request({url : url , json : true},(error, {body})=>{
        if(error){
            callback('unable to connect to the weather servers!' , undefined)
        }else if(body.features.length === 0 ){
            callback('unable to find the location!' , undefined)
        }else{
            callback(undefined ,{
                longitude : body.features[0].center[1],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name,
            })
        }
    })
}
module.exports = geocode;
