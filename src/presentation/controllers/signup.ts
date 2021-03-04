import { HttpResponse, HttpResquet } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpResquet: HttpResquet): HttpResponse {
    if (!httpResquet.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpResquet.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
