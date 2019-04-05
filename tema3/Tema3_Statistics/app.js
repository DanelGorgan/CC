const express = require ('express');
const HttpStatus = require('http-status-codes');
const events = require('./datastore');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    console.log(__dirname + '\\public\\index.html');
    res.sendFile(__dirname + '\\public\\index.html');
    res.status(HttpStatus.OK)
        .end();
});

app.get('/events', async (req, res) => {
    let result = await events.getEvents(req, res);
    res.json(result);
});
const PORT = 8080;

app.listen(PORT, () =>{
    console.log(`App listening to port ${PORT}`);
});

