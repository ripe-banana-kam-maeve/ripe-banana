const request = require('../request');
const db = require('../db');
const { postFilm } = require('../__tests__/films.test');

describe('studios', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const disney = {
    name: 'pixar',
    address: {
      city: 'beaverton',
      state: 'OR',
      country: 'USA'
    }
  };

  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [{ _id: expect.any(String), role: 'champ', actor: { _id: expect.any(String), name: expect.any(String) } }]
  };
  

  function postStudio(disney) {
    return request
      .post('/api/studios')
      .send(disney)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an studio', () => {
    return postStudio(disney).then(studio => {
      expect(studio).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...disney
      });
    });
  });

  it('gets an studio by id', () => {
    return postStudio(disney).then(studio => {
      return postFilm(toyStory)
        .expect(200)
        .then(() => {
          return request.get(`/api/studios/${studio._id}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            console.log(body)


          );
        });
    });
  });
});
