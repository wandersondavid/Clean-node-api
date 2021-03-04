import {HttpResponse, HttpResquet} from '../protocols/http'
import {MissingParamError} from '../errors/missing-param-error'

export class SignUpController {
  handle (httpResquet: HttpResquet): HttpResponse {
    if (!httpResquet.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpResquet.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
