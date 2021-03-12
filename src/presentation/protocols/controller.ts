import { HttpResponse, HttpResquet } from './http'

export interface Controller {
  handle: (httpResquet: HttpResquet) => Promise<HttpResponse>
}
