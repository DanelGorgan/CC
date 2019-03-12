import Airport from '../models/airport'
import APIError from "../helpers/APIErrorHelper"
import httpStatus from 'http-status'
import {catchErrors} from "../helpers/errorHelpers";
import * as validator from "../validators/validatorHelper";
import utilities from '../helpers/utilities'
import _ from 'lodash'

export async function getAirports(req, res) {
    let airports = [];
    let err;
    try {
        airports = await Airport.find({});
        if (_.size(airports) === 0) {
            err = new APIError('No airport found with this id', httpStatus.UNPROCESSABLE_ENTITY)
            err = catchErrors(err)
        }
    } catch (e) {
        err = new APIError('No airport found with this id', httpStatus.UNPROCESSABLE_ENTITY)
        err = catchErrors(err)
    }
    !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, airports)
}

export async function getAirport(req, res) {
    let airport = {};
    let err;
    try {
        airport = await Airport.findOne({_id: req.params.id});
        if (!airport) {
            err = new APIError('No airport found with this id', httpStatus.UNPROCESSABLE_ENTITY)
            err = catchErrors(err)
        }
    } catch (e) {
        err = catchErrors(err)
    }
    !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, airports)
}

export async function addAirports(req, res) {
    let body = '';
    let airports = [];
    req.on('data', chunk => {
        body += chunk
    });
    req.on('end', async function () {
        if (body) {
            body = JSON.parse(body);
            let err = await validator.postValidate(req, res, body);
            if (!err.error) {
                for (let i = 0; i < body.airports.length; i++) {
                    try {
                        let airport = await Airport.create({
                            name: body.airports[i].name,
                            city: body.airports[i].city,
                            longitude: body.airports[i].longitude,
                            latitude: body.airports[i].latitude,
                        });
                        airports.push(airport)
                    } catch (e) {
                        err = new APIError('Error while creating the airport!', httpStatus.UNPROCESSABLE_ENTITY)
                        err = catchErrors(err)
                    }
                }
            }
            !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res)
        }
    })
}

export async function updateAirports(req, res) {
    let body = '';
    let airports;
    req.on('data', chunk => {
        body += chunk
    });
    req.on('end', async function () {
        if (body) {
            body = JSON.parse(body);
            let err = await validator.putValidate(req, res, body)
            if (!err.error) {
                try {
                    let updated = airports = await Airport.findOneAndUpdate({_id: req.params.id}, {$set: {name: body.airports.name}}, {new: true});
                    if (updated === null) {
                        err = new APIError('No airport updated. Check the id from the query', httpStatus.UNPROCESSABLE_ENTITY);
                        err = catchErrors(err)
                    }
                } catch (e) {
                    err = new APIError('Error while updating the airport!', httpStatus.UNPROCESSABLE_ENTITY);
                    err = catchErrors(err)
                }
            }
            !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res)
        }
    })
}

export async function deleteAirports(req, res) {
    let err;
    try {
        let d = await Airport.deleteOne({_id: req.params.id});
        if (d.n === 0) {
            err = new APIError('No airport deleted. Check the id from the query', httpStatus.UNPROCESSABLE_ENTITY);
            err = catchErrors(err)
        }
    } catch (e) {
        err = new APIError('Error while deleting the airport!', httpStatus.UNPROCESSABLE_ENTITY);
        err = catchErrors(err)
    }
    !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res)
}
