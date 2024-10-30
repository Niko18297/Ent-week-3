
const request = require("supertest")
const app = require('../../app')

const BASE_URL = '/api/v1/directors'
let directorId

//! 1) post
//! 2) GETall
//! 3) getOne
//! 4) update
//! 5) delete

const director = {
  firstName: 'Martin',
  lastName: 'Scorsese',
  nationality: 'american',
  image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Martin_Scorsese-68754.jpg/220px-Martin_Scorsese-68754.jpg',
  birthday:'17/11/1942'
}

const directorUpdate = {                                      
  firstName: 'Pedro'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.name to be actor.firstName ", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(director)

    directorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})


test("GET -> 'BASE_URL', should return status code 200 and res.body to havent length === 0 ", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name to be director.firstName ", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
  expect(res.body.id).toBe(directorId)
})


test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be directorUpdate.firstName ", async () => {

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)
  expect(res.body.id).toBe(directorId)
})

test("delete -> 'BASE_URL/:id', should return status code 204 ", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(204)
})