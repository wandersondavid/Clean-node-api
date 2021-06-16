import { Controller, HttpResponse, HttpResquet } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub: Controller
}

const makeController = (): Controller =>{
  class ControlletStub implements Controller {
    async handle (httpRequest: HttpResquet): Promise<HttpResponse> {
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

const makeSut = ():SutTypes =>{

  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', ()=> {
  test ('Shout call controller handle ', async ()=>{
    const {sut, controllerStub} = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})