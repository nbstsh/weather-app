const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectory))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query 
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastStr) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastStr,
                location,
                address
            })
        })
    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Error 404 Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on prot ' + port)
})