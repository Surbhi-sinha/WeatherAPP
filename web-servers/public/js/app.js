console.log('getting the response from the servers')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#msg1')
const messagetwo = document.querySelector('#msg2')
const messagethree = document.querySelector('#msg3')
const messagefour= document.querySelector('#msg4')
const messagefive = document.querySelector('#msg5')



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'loading...'
    messagetwo.textContent = ''
    

    // the fetch statement was altered from
    // fetch(https//:localhost:3000/weather?address to the current one to make it run throught the heroku 
    // we need to do three things for heroku 1. updating the pakage.json start call, 2. making the port dyanamin in src/app.js , 3. changint the fecth statement here)
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageone.textContent = data.error
        }else{
           messageone.textContent = "Place : "+data.location
           messagetwo.textContent = "Average temperature : "+data.forecast.temperature +" F"
           messagethree.textContent = "Wind Speed : " + data.forecast.windSpeed + "km/sec"
           messagefour.textContent ="Precepitation : "+  data.forecast.precipitation+ " per metric cube"
           messagefive.textContent = "Pressure : "+ data.forecast.pressure 
        }
    })
})
})   