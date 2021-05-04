import { Controller, HttpResquet } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResquet: HttpResquet = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpResquet)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
