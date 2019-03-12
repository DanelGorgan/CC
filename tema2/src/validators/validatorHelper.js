import tv4 from "tv4";
import {postAirportSchema, putAirportSchema, distanceSchema} from "./validatorSchema";

export async function postValidate(req, res, body) {
    let result = await tv4.validateResult(body, postAirportSchema)
    if (result.error) {
        let err = {
            error_type: 'validation',
            errors: result.error
        }
        return err
    }
    return {}
}

export async function putValidate(req, res, body) {
    let result = await tv4.validateResult(body, putAirportSchema)
    if (result.error) {
        let err = {
            error_type: 'validation',
            errors: result.error
        }
        return err
    }
    return {}
}

export async function distanceValidate(req, res, body) {
    let result = await tv4.validateResult(body, distanceSchema)
    if (result.error) {
        let err = {
            error_type: 'validation',
            errors: result.error
        }
        return err
    }
    return {}
}