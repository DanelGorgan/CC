const express = require('express');
const HttpStatus = require('http-status-codes');
const invitations = require('./datastore');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/', async(req, res) => {
    let email = req.query.email;
    console.log(email);
    invitations.updateInvitation(req, res, email);

});
const PORT = 8081;

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});

