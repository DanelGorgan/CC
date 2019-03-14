import httpStatus from 'http-status/lib/index'

export function catchErrors (err) {
  return {
    error_type: httpStatus[err.status],
    status_code: err.status,
    errors: {
      default: {
        msg: err.message,
        stack: err.stack
      }
    }
  }
}
