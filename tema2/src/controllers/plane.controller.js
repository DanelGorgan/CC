import Plane from '../models/plane'
import APIError from '../helpers/APIErrorHelper'
import httpStatus from 'http-status'
import { catchErrors } from '../helpers/errorHelpers'
import * as validator from '../validators/validatorHelper'
import utilities from '../helpers/utilities'
import _ from 'lodash'

export async function getPlanes (req, res) {
  let planes = []
  let err
  try {
    planes = await Plane.find({})
  } catch (e) {
    err = new APIError('No plane found with this id', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, planes)
}

export async function getPlane (req, res) {
  let plane = {}
  let err
  try {
    plane = await Plane.findOne({ _id: req.params.id })
    if (!plane) {
      err = new APIError('No plane found with this id', httpStatus.UNPROCESSABLE_ENTITY)
      err = catchErrors(err)
    }
  } catch (e) {
    err = catchErrors(e)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, 422) : utilities.sendResponse(res, plane)
}

export async function addPlanes (req, res) {
  let body = ''
  let err
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', async function () {
    if (body) {
      body = JSON.parse(body)
      try {
        let plane = await Plane.findOne({ name: body.name })
        if (plane) {
          err = new APIError('Plane already exists!', httpStatus.CONFLICT)
          err = catchErrors(err)
        } else {
          await Plane.create(body)
        }
      } catch (e) {
        err = new APIError('Error while creating the plane!', httpStatus.UNPROCESSABLE_ENTITY)
        err = catchErrors(err)
      }
    }
    !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res, 'Success', 201)
  })
}

export async function updatePlane (req, res) {
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
          let updated = await Plane.findOneAndUpdate({ _id: req.params.id }, { $set: { name: body.planes.name } }, { new: true })
          if (updated === null) {
            err = new APIError('No plane updated. Check the id from the query', httpStatus.UNPROCESSABLE_ENTITY)
            err = catchErrors(err)
          }
        } catch (e) {
          err = new APIError('Error while updating the plane!', httpStatus.UNPROCESSABLE_ENTITY)
          err = catchErrors(err)
        }
      }
      !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
    }
  })
}

export async function updatePlanes (req, res) {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', async function () {
    if (body) {
      body = JSON.parse(body)
      // let err = await validator.postValidate(req, res, body)
      let err = {}
      if (!err.error) {
        try {
          await Plane.remove({})
          for (let i = 0; i < body.planes.length; i++) {
            await Plane.create({
              ...body.planes[i],
              airportId: req.params.airportId
            })
          }
        } catch (e) {
          err = new APIError('Error while updating the plane!', httpStatus.UNPROCESSABLE_ENTITY)
          err = catchErrors(err)
        }
      }
      !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
    }
  })
}

export async function deletePlanes (req, res) {
  let err
  try {
    let d = await Plane.deleteOne({ _id: req.params.id })
    if (d.n === 0) {
      err = new APIError('No plane deleted. Check the id from the params', httpStatus.UNPROCESSABLE_ENTITY)
      err = catchErrors(err)
    }
  } catch (e) {
    err = new APIError('Error while deleting the plane!', httpStatus.UNPROCESSABLE_ENTITY)
    err = catchErrors(err)
  }
  !_.isEmpty(err) ? utilities.sendResponse(res, err, err.status_code) : utilities.sendResponse(res)
}
