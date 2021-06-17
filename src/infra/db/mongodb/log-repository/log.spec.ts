import { Collection } from "mongodb"
import { MongoHelper } from "../helpers/mongo-helper"
import { LogMongoRepository } from "./log"

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Shoul creat an error lo on success',async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const  caunt = await errorCollection.countDocuments()
    expect(caunt).toBe(1)
  })
})