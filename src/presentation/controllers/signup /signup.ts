import { HttpResponse, HttpResquet, Controller, EmailValidator, AddAccount } from './singup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, severError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpResquet: HttpResquet): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpResquet.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpResquet.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accunt = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(accunt)
    } catch (error) {
      console.error(error)
      return severError()
    }
  }
}
