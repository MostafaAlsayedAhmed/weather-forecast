const express = require('express');
const hbs = require('hbs');
const path = require('path');

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000;



// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public_folder')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve - The Public Directory
app.use(express.static(publicDirectoryPath))


//App Pages
app.get('', (req, res) => {
    res.render('index', {
        name: 'mostafa',
        family: 'khair'
    })
})
app.get('/index', (req, res) => {
    res.render('index', {
        name: 'mostafa',
        family: 'khair'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'mostafa',
        family: 'khair',
        title: 'Program Page'
    })
})

app.get('/program', (req, res) => {
    res.render('program', {
        name: 'mostafa',
        family: 'khair',
        title: 'Program Page'
    })
})

//App APIs
app.get('/weather', (req, res) => {

    const location = req.query.location;
    geocode(location, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        const { latitude: lat, longitude: long } = data;
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
  
            res.send(forecastData)
        })
    })
})

app.get('/products', (req, res) => {
    if (req.query.id) {
        res.send(req.query.id)
    } else {
        res.send({
            products: []
        })
    }
})
 
app.get('/contact', (req, res) => {
    res.send('contact express!')
})

//Not Found pages
app.get('/program/*', (req, res) => {
    res.render('404', {
        errorMessage: 'The Program Not Found',
        title: '404 Error'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'The Page Not Found',
        title: '404 Error'
    })
})






app.listen(port, () => {
    console.log(`Server is up on port ${port}`); 
}) 