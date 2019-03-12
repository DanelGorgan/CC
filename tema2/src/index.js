import config from './config'
import http from 'http'
import mongoose from './mongoose'
import {catchErrors} from "./helpers/errorHelpers"
import finalhandler from 'finalhandler'
import Router from 'router'
import APIError from "./helpers/APIErrorHelper"
import httpStatus from "http-status/lib/index"
import api from './api'

process.on('uncaughtException', function (err) {
    console.log(err);
});

let db = mongoose.connection;
db.on('error', () => {
    console.error('Cannot connect to database!')
});
db.once('open', () => {
    console.log('Connected to database')
});


let router = Router();

router.use('/api',api);

router.use((req, res) => {
    let err = new APIError('API not found', httpStatus.NOT_FOUND);
    err = catchErrors(err);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.write(JSON.stringify(err));
    res.end()
});

var server = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res))
});

server.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/ (${config.env})`);
});

