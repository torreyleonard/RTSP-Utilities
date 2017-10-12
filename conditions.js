var http = require('http');
var fs = require('fs');

const apiKey = '';
const pws = '';

const url = 'http://api.wunderground.com/api/' + apiKey + '/conditions/q/pws:' + pws + '.json';

var minutes = 5, interval = minutes * 60 * 1000;
setInterval(getConditions, interval);

console.log("Running every " + minutes + " minutes.");

getConditions();

function getConditions() {

    console.log("Getting current conditions...");

    http.get(url, function(res) {

        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {

            var json = JSON.parse(body).current_observation;

            const temp = json.temp_f;
            const windDir = json.wind_dir;
            const windSpeed = (json.wind_mph * 0.868976).toFixed(2);
            const humidity = json.relative_humidity;

            var string = '';

            if (windSpeed > 0) {
                string = windDir + " " + windSpeed + " KN | " + temp + " F";
            } else {
                string = temp + " F";
            }

            console.log(" - Current conditions: " + string);
            writeConditions(string);

        });

    }).on('error', function(err) {
        console.log(err.message);
    });
}

function writeConditions(string) {
    fs.writeFile("conditions.txt", string, function(err) {
        if (err) return console.log(err);
    });
}
