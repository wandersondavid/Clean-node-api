import { Controller, HttpResponse, HttpResquet } from '../../presentation/protocols'


export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpResquet): Promise<HttpResponse> {
    const httpResponse =  await this.controller.handle(httpRequest)
    return httpResponse
  }
}
