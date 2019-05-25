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

app.get('/:tablename', eventController.getAllFromDatabase);

app.put('/:tablename/:id', eventController.updateEntity);

app.post('/:tablename', eventController.addEntity);

app.delete('/:tablename/:id', eventController.deleteEntity);

app.get('/:tablename/:attribute/:value', eventController.getEntityByAttribute);

app.get('/:tablename/:id', eventController.getEntityById);

app.get('/', (req, res) => {
    res.json('DATASTORE service')
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
});
