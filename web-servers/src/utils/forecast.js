const request = require('postman-request');

//Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast =(latitude , longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2fba3fee3ae18aaec42d0a9e6481edd6&query='+latitude +',' + longitude+'&units=f'
    request({url:url , json : true},(error , {body}) => {
        if(error){
            callback('unable to connect to the weather servers!', undefined)
        }else if(body.error){
            callback('unable to find the exact location!' , undefined)
        }else{
            callback(undefined , {
                temperature : body.current.temperature,
                windSpeed : body.current.wind_speed,
                precipitation : body.current.precip,
                pressure : body.current.pressure,

            })
        }
    })
}

module.exports = forecast