const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config');


let app = express();
app.server = http.createServer(app);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json('hello')
});

app.get('/email-events', (req, res) => {
    res.sendFile(__dirname + '/public/getEvents.html')
});

app.get('/reminder', (req, res) => {
    res.sendFile(__dirname + '/public/reminder.html')
});

app.get('/weather', (req, res) => {
    res.sendFile(__dirname + '/public/vreme.html')
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
});