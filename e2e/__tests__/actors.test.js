const request = require('../request');
const db = require('../db');
// const mongoose = require('mongoose');
const { postFilm } = require('../../e2e/__tests__/films.test');

describe('actors', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const john = {
    name: 'Jhonny Depp',
    dob: 'March 23rd 1957',
    pob: 'Pittsburg, PA'
  };

  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [{ _id: expect.any(String), role: 'champ', actor: { _id: expect.any(String), name: expect.any(String) } }]
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
      return postFilm(toyStory)
        .expect(200)
        .then(() => {
          return request.get(`/api/actors/${actor._id}`).expect(200);
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
        expect(body).toEqual({ _id: expect.any(String), name: 'john' });
      });
  });
});
