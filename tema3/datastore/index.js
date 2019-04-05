const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    eventController = require('./events.controller'),
    config = require('./config');


let app = express();
app.server = http.createServer(app);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());    // to support JSON-encoded bodies

app.use(express.static('public'));

app.use(cors());

app.post('/events', (req, res) => {
    eventController.addEvent(req, res).catch(console.error);
});

app.get('/events/:id', (req, res) => {
    eventController.getEvent(req, res).catch(console.error);
});

app.get('/events', (req, res) => {
    eventController.getEvents(req, res).catch(console.error);
});

app.get('/', (req, res) => {
    res.json('DATASTORE service')
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
});