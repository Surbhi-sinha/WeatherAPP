const path = require('path');
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000
//defines path for express config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname , '../templates/views');
const partialsPath = path.join(__dirname , '../templates/partials');

//set up handle bars and views location
app.set('view engine' , 'hbs');
app.set('views' , viewPath);
hbs.registerPartials(partialsPath)
// ^^ this line registers our partials path to the app.js file which is connected to the main page of our website and other pages



//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//setting up route handlers for different pages
app.get('' , (req, res) => {
    res.render('index',{
        title:'Todays\'s Weather',
        name: 'Surbhi Sinha'
    })
})

app.get('/about' , (req , res) =>{
    res.render('about' , {
        title:'About me',
        name:'Surbhi Sinha'
    })
})

app.get('/help' , (req , res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Surbhi Sinha'
    })
})

app.get('/weather' , (req, res) => {
    //this line adds the require statement for getting the address input by iser to serch the weather of the perticular place
    if(!req.query.address){
        return res.send({
            error:'the address must be provided'
        })
    }
    
    // wiring up the weather
    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude , longitude ,(error , forecastData) => {
            if(error){
                return res.send({error: error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
            
        })
    })
    
})

// 404 or error pages should be added in the last because it is accssed only if the url provided does not matchs the above routes
app.get('*' , (req , res)=>{
    res.render(('404page'),{
        errormsghead : 'Error 404',
        errorpara : 'Page not found'
    })
})
app.listen(port , () => {
    console.log("serving is up on the port "+ port)
})