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
    name: 'Tommy Depp',
    dob: 'March 23rd 1957',
    pob: 'Pittsburg, PA'
  };

  function postActor(tom) {
    return request
      .post('/api/actors')
      .send(tom)
      .expect(200)
      .then(({ body }) => body);
  }

  const disney = {
    name: 'MGM',
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

  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [{ _id: expect.any(String), role: 'champ', actor: expect.any(Object) }]
  };

  function postFilm(film) {
    return Promise.all([postActor(tom), postStudio(disney)])
      .then(([actor, studio]) => {
        console.log(actor, studio);
        film.cast[0] = { _id: actor._id, role: actor.role, actor: { _id: actor._id, name: actor.name } };
        film.studio = { _id: studio._id, name: studio.name };
        return request
          .post('/api/films')
          .send(toyStory)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it.only('posts a film', () => {
    return postFilm(toyStory).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          cast: [{ actor: { _id: expect.any(String) } }],
          studio: { _id: expect.any(String) }
        },

       
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

            
          );
        });
    });
  });
});
