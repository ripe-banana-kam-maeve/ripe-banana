const request = require('../request');
const db = require('../db');

describe.only('films api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('films'),
      db.dropCollection('actors'),
      db.dropCollection('studios')
    ]);
  });

  const tom = {
    name: 'Tom Hanks',
    birthYear: 1953
  };

  function postActor(tom) {
    return request
      .post('/api/actors')
      .send(tom)
      .expect(200)
      .then(({ body }) => body);
  }

  const disney = {
    name: 'Pixar',
    yearFounded: 1925,
    alive: true
  };

  function postStudio(disney) {
    return request
      .post('/api/studios')
      .send(disney)
      .expect(200)
      .then(({ body }) => body);
  }

  const toyStory = {
    title: 'toy story',
    director: 'tom hanks',
    yearPub: 1991,
    digital: false,
    actors: [],
    studio: {}
  };

  function postFilm(film) {
    return Promise.all([postActor(tom), postStudio(disney)])
      .then(([actor, studio]) => {
        film.actors[0] = actor._id;
        film.studio = studio._id;
        return request
          .post('/api/films')
          .send(toyStory)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts a film', () => {
    return postFilm(toyStory).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          actors: [expect.any(String)],
          studio: expect.any(String)
        },

        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "actors": Array [
            Any<String>,
          ],
          "digital": false,
          "director": "tom hanks",
          "studio": Any<String>,
          "title": "toy story",
          "yearPub": 1991,
        }
      `
      );
    });
  });

  it('gets a film by id', () => {
    return postFilm(toyStory).then(film => {
      return request
        .get(`/api/films/${film._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              actors: [expect.any(String)],
              studio: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "actors": Array [
                Any<String>,
              ],
              "digital": false,
              "director": "tom hanks",
              "studio": Any<String>,
              "title": "toy story",
              "yearPub": 1991,
            }
          `
          );
        });
    });
  });

  it('get all films', () => {
    return postFilm(toyStory).then(() => {
      return request
        .post('/api/films')
        .send(toyStory)
        .expect(200)
        .then(() => {
          return request.get('/api/films').expect(200);
        })
        .then(({ body }) => {
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              actors: [expect.any(String)],
              studio: expect.any(String)
            },

            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "actors": Array [
                Any<String>,
              ],
              "digital": false,
              "director": "tom hanks",
              "studio": Any<String>,
              "title": "toy story",
              "yearPub": 1991,
            }
          `
          );
        });
    });
  });
});
