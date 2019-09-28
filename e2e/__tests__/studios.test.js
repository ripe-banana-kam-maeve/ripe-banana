const request = require('../request');
const db = require('../db');

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
      return Promise.all([
        
      ])
        .post('/api/films')
        .send({
          title: 'Alladin',
          studio: studio._id,
          released: 1977,
          cast: [{ role: 'champ', actor: 'kljl' }]
        })
        .expect(200)
        .then(() => {
          return request.get(`/api/studios/${studio._id}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },


          );
        });
    });
  });
});
