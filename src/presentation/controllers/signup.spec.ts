import { SignUpController } from './signup'
import {MissingParamError} from '../errors/missing-param-error'
describe('SignUp Controller', () => {
  test('Should returb 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpResquet = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpResquet)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('Should returb 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpResquet = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpResquet)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
