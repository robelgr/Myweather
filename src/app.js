const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// serve the public dir 
const app = express()
const publicdir = path.join(__dirname, '../public')
app.use(express.static(publicdir))
// pointing to the right views dir 
const viewsdir = path.join(__dirname, '../templete/views')
app.set('views', viewsdir)
// register the partials
const partialsdir = path.join(__dirname, '../templete/partials')
hbs.registerPartials(partialsdir)
// set up the view engine 
app.set('view engine', 'hbs')
// set up routes 
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        createdby: 'robel girmachew'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        createdby: 'robel girmachew'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        createdby: 'robel girmachew'
    })
})
app.get('/weather', (req, res) => {
    // send json not page
    geocode(req.query.address, (error, data) => {
        if (error) {
            res.send({
                error
            })
        } else {
            const { lon, lat, location_name } = data
            forecast(lon, lat, (error, response) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    const { temp, humidity } = response
                    res.send({
                        forcast_string: `it is currently ${temp}. And the humidity is ${humidity}`,
                        address: location_name
                    })
                }
            })
        }
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'page not found',
        createdby: 'robel girmachew'
    })
})

app.listen(31000, () => {
    console.log('server is up and running');
})
