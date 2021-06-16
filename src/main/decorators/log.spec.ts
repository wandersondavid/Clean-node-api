import { Controller, HttpResponse, HttpResquet } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"

describe('LogController Decorator', ()=> {
  test ('Shout call controller handle ', async ()=>{
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
    const controllerStub = new ControlletStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
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