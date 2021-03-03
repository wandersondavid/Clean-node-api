export class SignUpController {
  handle (httpResquet: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
