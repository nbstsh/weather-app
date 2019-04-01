const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/83acee9bab711bc38d86858671259a25/${lat},${long}`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to wether service!', undefined)
        } else if (body.error){
            callback('Unable to find location.', undefined)
        } else {
            const { summary } = body.daily.data[0]
            const { temperature, precipProbability } = body.currently
            callback(undefined, `${summary}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast
    
    