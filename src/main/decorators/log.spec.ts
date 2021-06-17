import { Controller, HttpResponse, HttpResquet } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"
import { severError } from '../../presentation/helpers/http-helper'
import { LogErrorRepository } from "../../data/protocols/log-error-repository"

const makeController = (): Controller => {
  class ControlletStub implements Controller {
    async handle(httpRequest: HttpResquet): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: 'wanderson',
        }
      }

      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControlletStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {

      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

const makeFakeRequest = (): HttpResquet => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub: Controller,
  logErrorRepositoryStub:LogErrorRepository,
}

const makeSut = (): SutTypes => {

  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  }
}

describe('LogController Decorator', () => {
  test('Shout call controller handle ', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Shout return the same result of the controller ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'wanderson',
      }
    })
  })

  test('Shout call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = severError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})