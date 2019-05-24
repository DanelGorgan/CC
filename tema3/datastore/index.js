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

app.post('/places', eventController.addPlace);

app.get('/places/:id', eventController.getPlace);

app.put('/places/:id', eventController.updatePlace);

app.delete('/places/:id', eventController.deletePlace);

app.get('/places', eventController.getPlaces);

app.get('/', (req, res) => {
    res.json('DATASTORE service')
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
});
