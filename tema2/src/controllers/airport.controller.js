import Airport from '../models/airport'
import APIError from '../helpers/APIErrorHelper'
import httpStatus from 'http-status'
import { catchErrors } from '../helpers/errorHelpers'
import * as validator from '../validators/validatorHelper'
import utilities from '../helpers/utilities'
import _ from 'lodash'

export async function getAirports (req, res) {
  let airports = []
  let err
  try {
    airports = await Airport.find({})
  } catch (e) {
    err = new APIError('No airport found with this id', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, airports)
}

export async function getAirport (req, res) {
  let airport = {}
  let err
  try {
    airport = await Airport.findOne({ _id: req.params.id })
    if (!airport) {
      err = new APIError('No airport found with this id', httpStatus.UNPROCESSABLE_ENTITY)
      err = catchErrors(err)
    }
  } catch (e) {
    err = catchErrors(e)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, airport)
}

export async function addAirports (req, res) {
  let body = ''
  let created
  let airports = []
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', async function () {
    if (body) {
      body = JSON.parse(body)
      let err = await validator.postValidate(req, res, body)
      if (!err.error) {
        for (let i = 0; i < body.airports.length; i++) {
          try {
            let airport = await Airport.create({
              name: body.airports[i].name,
              city: body.airports[i].city,
              longitude: body.airports[i].longitude,
              latitude: body.airports[i].latitude
            })
            airports.push(airport)
          } catch (e) {
            err = new APIError('Error while creating the airport!', httpStatus.UNPROCESSABLE_ENTITY)
            err = catchErrors(err)
          }
        }
      }
      !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res, created, 201)
    }
  })
}

export async function updateAirport (req, res) {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', async function () {
    if (body) {
      body = JSON.parse(body)
      let err = await validator.putValidate(req, res, body)
      if (!err.error) {
        try {
          let airport = await Airport.findOne({ name: body.airports.name })
          if (airport) {
            return utilities.sendResponse(res, 'There is already an airport with this name!', 409)
          }
          let updated = await Airport.updateOne({ _id: req.params.id }, { $set: body.airports }, { new: true })
          if (updated.nModified === 0) {
            return utilities.sendResponse(res, null, 204)
          }
        } catch (e) {
          err = new APIError('Error while updating the airport!', httpStatus.UNPROCESSABLE_ENTITY)
          err = catchErrors(err)
        }
      }
      !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
    }
  })
}

export async function updateAirports (req, res) {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', async function () {
    if (body) {
      body = JSON.parse(body)
      let err = await validator.postValidate(req, res, body)
      if (!err.error) {
        try {
          await Airport.remove({})
          for (let i = 0; i < body.airports.length; i++) {
            await Airport.create(body.airports[i])
          }
        } catch (e) {
          err = new APIError('Error while updating the airport!', httpStatus.UNPROCESSABLE_ENTITY)
          err = catchErrors(err)
        }
      }
      !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
    }
  })
}

export async function deleteAirport (req, res) {
  let err
  try {
    let d = await Airport.deleteOne({ _id: req.params.id })
    if (d.n === 0) {
      err = new APIError('No airport deleted. Check the id ', httpStatus.UNPROCESSABLE_ENTITY)
      err = catchErrors(err)
    }
  } catch (e) {
    err = new APIError('Error while deleting the airport!', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
}

export async function deleteAirports (req, res) {
  let err
  try {
    await Airport.remove({})
  } catch (e) {
    err = new APIError('Error while deleting the airport!', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
}

export async function cars (req, res) {
  let err = new APIError('https://knowyourmeme.com/photos/1252533-i-bet-there-will-be-flying-cars-in-the-future', httpStatus.NOT_IMPLEMENTED)
  err = catchErrors(err)
  utilities.sendResponse(res, err, err.status_code)
}
