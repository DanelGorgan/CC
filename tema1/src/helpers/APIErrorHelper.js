import httpStatus from 'http-status'

class ExtendableError extends Error {
  constructor (message, status) {
    super()
    this.message = message
    this.status = status
  }
}

class APIError extends ExtendableError {
  constructor (message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status)
  }
}

export default APIError
