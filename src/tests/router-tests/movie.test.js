require('../../models')
const request = require("supertest")
const app = require('../../app')

const BASE_URL = '/api/v1/movies'

let actorId
let genreId
let directorId

beforeAll(async () => {
  const actors = {
    firstName: 'Ryan',
    lastName: 'Reynolds',
    nationality: 'canadian',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/220px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
    birthday:'23/10/1976'
  }

  const genres = {
    name:"horror"
  }

  const directors = {
  firstName: 'Martin',
  lastName: 'Scorsese',
  nationality: 'american',
  image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Martin_Scorsese-68754.jpg/220px-Martin_Scorsese-68754.jpg',
  birthday:'17/11/1942'
  }

  const res = await request(app)
    .post('/api/v1/actors','/api/v1/genres','/api/v1/directors')
    .send(actors,genres,directors)

  actorId = res.body.id
  genreId = res.body.id
  directorId = res.body.id
})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/actors/${actorId}`,`/api/v1/genres/${genreId}`,`/api/v1/directors/${directorId}`)
})



let movieId

//! 1) post
//! 2) GETall
//! 3) getOne
//! 4) update
//! 5) delete

const movie = {
    "name": "The Avengers",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/The_Avengers_Logo_Black.svg/220px-The_Avengers_Logo_Black.svg.png",
    "synopsis": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity",
    "releaseYear": "2012"
}

const movieUpdate = {                                      
  name: 'Lion King'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.name to be movie.name ", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(movie)

    movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})


test("GET -> 'BASE_URL', should return status code 200 and res.body to havent length === 0 ", async () => {

  const res = await request(app)
    .get(BASE_URL)
  
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].actors).toHaveLength(0)

  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name to be movie.name ", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
  expect(res.body.id).toBe(movieId)

  expect(res.body.genres).toBeDefined()
  expect(res.body.genres).toHaveLength(0)

  expect(res.body.actors).toBeDefined()
  expect(res.body.actors).toHaveLength(0)

  expect(res.body.directors).toBeDefined()
  expect(res.body.directors).toHaveLength(0)
})


test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be movieUpdate.name ", async () => {

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
  expect(res.body.id).toBe(movieId)
})


test("POST -> '/movies/:id/actors', should return status code 200, adn res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${actorId}/actors`)
      .send([actorId])
  
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(actorId)
  
    expect(res.body[0].movieActor.actorId).toBeDefined()
    expect(res.body[0].movieActor.actorId).toBe(actorId)
  
  })

  test("POST -> '/movies/:id/genres', should return status code 200, adn res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${genreId}/genres`)
      .send([genreId])
  
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(genreId)
  
    expect(res.body[0].movieGenre.genreId).toBeDefined()
    expect(res.body[0].movieGenre.genreId).toBe(genreId)
  
  })

  test("POST -> '/movies/:id/directors', should return status code 200, adn res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${directorId}/directors`)
      .send([directorId])
  
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(directorId)
  
    expect(res.body[0].movieDirector.directorId).toBeDefined()
    expect(res.body[0].movieDirector.directorId).toBe(directorId)
  
  })

test("delete -> 'BASE_URL/:id', should return status code 204 ", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(204)
})