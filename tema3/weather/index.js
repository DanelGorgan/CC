const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    request = require('request'),
    config = require('./config');


let app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());    // to support JSON-encoded bodies
app.use(cors());

app.use(express.static('public'));


app.get('/', (req, res) => {
    let url1 = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${config.weather_key}`;
    request.get({
        url: url1,
        time: true
    }, async function (error, response, responseBody) {
        if (error) {
            console.log(error)
        }
        responseBody = JSON.parse(responseBody);
        let weather = `Weather is ${responseBody.weather[0].main}. More details about weather: ${responseBody.weather[0].description}.`;
        return res.json({weather: weather})
    });
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
});