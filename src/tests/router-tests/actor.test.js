
const request = require("supertest")
const app = require('../../app')

const BASE_URL = '/api/v1/actors'
let actorId

//! 1) post
//! 2) GETall
//! 3) getOne
//! 4) update
//! 5) delete

const actor = {
  firstName: 'Ryan',
  lastName: 'Reynolds',
  nationality: 'canadian',
  image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/220px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
  birthday:'23/10/1976'
}

const actorUpdate = {                                      
  firstName: 'Carlos'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.name to be actor.firstName ", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(actor)

  actorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})


test("GET -> 'BASE_URL', should return status code 200 and res.body to havent length === 0 ", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name to be actor.firstName ", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
  expect(res.body.id).toBe(actorId)
})


test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be actorUpdate.firstName ", async () => {

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
  expect(res.body.id).toBe(actorId)
})

test("delete -> 'BASE_URL/:id', should return status code 204 ", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(204)
})