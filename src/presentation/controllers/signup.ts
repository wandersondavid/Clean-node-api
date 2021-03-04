import { HttpResponse, HttpResquet } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpResquet: HttpResquet): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpResquet.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
