const request = require("supertest")
const app = require('../../app')

const BASE_URL = '/api/v1/genres'
let genreId

//! 1) post
//! 2) GETall
//! 3) getOne
//! 4) update
//! 5) delete

const genre = {
 name:"horror"
}

const genreUpdate = {                                      
  name: 'action'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.name to be genre.name ", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(genre)

  genreId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})


test("GET -> 'BASE_URL', should return status code 200 and res.body to havent length === 0 ", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name to be genre.name ", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${genreId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
  expect(res.body.id).toBe(genreId)
})


test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be genreUpdate.name ", async () => {

  const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(genreUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genreUpdate.name)
  expect(res.body.id).toBe(genreId)
})

test("delete -> 'BASE_URL/:id', should return status code 204 ", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

  expect(res.status).toBe(204)
})