import tv4 from 'tv4'
import { postEstateSchema, putEstateSchema } from './validatorSchema'

export async function postValidate (req, res, body) {
  let result = await tv4.validateResult(body, postEstateSchema)
  if (result.error) {
    let err = {
      error_type: 'validation',
      errors: result.error
    }
    return err
  }
  return {}
}

export async function putValidate (req, res, body) {
  let result = await tv4.validateResult(body, putEstateSchema)
  if (result.error) {
    let err = {
      error_type: 'validation',
      errors: result.error
    }
    return err
  }
  return {}
}