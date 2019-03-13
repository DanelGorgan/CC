import utilities from '../helpers/utilities'
import { catchErrors } from '../helpers/errorHelpers'
import APIError from '../helpers/APIErrorHelper'
import httpStatus from 'http-status'

export function checkContent (req, res, next) {
  let content = req.headers['content-type']
  if (!content || content.indexOf('application/json') !== 0) {
    let err = new APIError('Only JSON supported!', httpStatus.UNSUPPORTED_MEDIA_TYPE)
    err = catchErrors(err)
    utilities.sendResponse(res, err, 415)
  } else {
    next()
  }
}
