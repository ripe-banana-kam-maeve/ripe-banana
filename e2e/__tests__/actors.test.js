const request = require('../request');
const db = require('../db');
const { postFilm } = require('../../e2e/__tests__/films.test');

describe('actors', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('actors'),
      db.dropCollection('films')
    ]);
  });

  const john = {
    name: 'Jhonny Depp',
    dob: 'March 23rd 1957',
    pob: 'Pittsburg, PA',
    films: []
  };

  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [
      {
        _id: expect.any(String),
        role: 'champ',
        actor: { _id: expect.any(String), name: expect.any(String) }
      }
    ]
  };

  function postActor(john) {
    return request
      .post('/api/actors')
      .send(john)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an actor', () => {
    return postActor(john).then(actor => {
      expect(actor).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...john
      });
    });
  });

  it('gets an actor by id', () => {
    return postActor(john).then(actor => {
      toyStory.cast[0] = actor;
      return postFilm(toyStory)
        .then(films => {
          return request.get(`/api/actors/${films.cast[0].actor}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              films: [
                {
                  _id: expect.any(String)
                }
              ]
            },

            `
            Object {
              "_id": Any<String>,
              "dob": "March 23rd 1957",
              "films": Array [
                Object {
                  "_id": Any<String>,
                  "released": 1977,
                  "title": "Alladin",
                },
              ],
              "name": "Tommy Depp",
              "pob": "Pittsburg, PA",
            }
          `
          );
        });
    });
  });

  it('gets all actors', () => {
    return postActor(john)
      .then(() => {
        return request.get('/api/actors').expect(200);
      })
      .then(({ body }) => {
        expect(body[0]).toEqual({
          _id: expect.any(String),
          name: 'Jhonny Depp'
        });
      });
  });
  it('deletes an actor when that actor is not in a movie', () => {
    return postActor(john)
      .then(actor => {
        return request.delete(`/api/actors/${actor._id}`)
          .expect(200);
      });
  });
});
