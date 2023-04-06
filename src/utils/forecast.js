const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    //WeatherStack 
    const url = 'http://api.weatherstack.com/current?access_key=7033f7124baa1a404a548b9d4d4306a6&query=' + latitude + ',' + longitude + ''

    //New Till 15April
    const url2 = 'https://api.weatherapi.com/v1/current.json?key=5af42bfc7012425d97c153521230204&q=' + latitude + ',' + longitude + ''

    request({ url: url2, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to Forecast service', undefined)
        } else if (body.error) {
            callback('Unable to Find Loaction, Try another search!', undefined)
        } else {
            body.apiWebsite = 'url2';
            callback(undefined, body);
        }
    })
}


module.exports = forecast;

// const localDate = new Date().toLocaleTimeString();
//WeatherStack
// callback(undefined, `It's ${localDate}, The Weather in ${body.location.name}, ${body.location.country} is ${body.current.weather_descriptions}, Currently ${body.current.temperature}\u2103 `);

//New Till 15April
//callback(undefined, `Hey! It's ${localDate}, The Weather in ${body.location.name}, ${body.location.country} is ${body.current.condition.text}, Currently ${body.current.temp_c}\u2103 `);
// callback(undefined, body);
