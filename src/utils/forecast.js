const request = require('request')
const forecast = (lon, lat, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=3aab5f16033452212f03943a18e5e23d&units=imperial`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to internet")
        } else if (response.body.cod == 400) {
            callback('unable to get weather for the given location')
        } else {
            const weatherdata = {
                temp: response.body.current.temp,
                humidity: response.body.current.humidity
            }
            callback(undefined, weatherdata)
        }
    })
}
module.exports = forecast