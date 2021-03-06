const mongoose = require("mongoose")
const faker = require("faker")
const request = require("supertest")
const jwt = require("jsonwebtoken")

// IMPORT HELPERS
const dbhandler = require("./dbhandler")
const app = require("../app")

// MOCKED FILES
jest.mock("../services/natsWrapper", () => require("./mocks/natsWrapper"))

// CREATE TEST DATABASE
beforeAll(async () => {
  process.env.JWT_KEY = faker.random.uuid()
  await dbhandler.connect()
})

// DROP TEST DABASE
beforeEach(async () => await dbhandler.clearDatabase())

// CLOSE TEST DATABSE
afterAll(async () => await dbhandler.closeDatabase())

// GLOBAL SCOPE
global.register = () => {
  // BUILD A PAYLOAD
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: faker.internet.email()
  }
  // GENERATE TOKEN
  const session = JSON.stringify({
    jwt: jwt.sign(payload, process.env.JWT_KEY)
  })
  // BUILD OBJECT AND BASE 6$ ENCRYPT
  return [`express:sess=${Buffer.from(session).toString("base64")}`]
}
