import { HttpResponse, HttpResquet } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (httpResquet: HttpResquet): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpResquet.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
