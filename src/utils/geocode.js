const request = require('postman-request');

const geocode = (address, callback) => {

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9zdGFmYTBhbGkiLCJhIjoiY2xmc3N5MHF1MDllbDNkbDJkcjU4NHI4YyJ9.jPic5psXPbZb9StM_nL_8Q`;

    request({ url: mapboxUrl, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service -GeoCode-', undefined)

        } else if (!body.features.length) {
            callback('Unable to Find Loaction -GeoCode-', undefined)
        } else {
            const [longitude, latitude] = body.features[0].center;
            callback(undefined, {
                'latitude': latitude,
                'longitude': longitude,
                'place_name': body.features[0].place_name,
            })
        }
 
    })
}

module.exports = geocode;