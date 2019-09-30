const request = require('../request');
const db = require('../db');

function postFilm(film) {
  return Promise.all([postActor(tom), postStudio(disney)])
    .then(([actor, studio]) => {
      film.cast[0] = {
        role: 'champ',
        actor: actor._id,
      };
      film.studio =
        studio._id
      ;
      return request
        .post('/api/films')
        .send(film)
        .expect(200);
    })
    .then(({ body }) => {
      return body;
    });
}

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

describe('films api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('films'),
      db.dropCollection('actors'),
      db.dropCollection('studios')
    ]);
  });



  it('posts a film', () => {
    return postFilm(toyStory).then(film => {
      expect(film).toEqual({ __v: 0, _id: expect.any(String), 'title': 'Alladin', 'studio': expect.any(String), 'released': 1977, 'cast': [{ '_id': expect.any(String), 'role': 'champ', 'actor': expect.any(String) }] });
    });
  });
  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [{ _id: expect.any(String), role: 'champ', actor: { _id: expect.any(String), name: expect.any(String) } }]
  };


  it('gets a film by id', () => {
    return postFilm(toyStory).then(film => {
      return request
        .get(`/api/films/${film._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(
            {
              __v: 0,
              _id: expect.any(String),
              'title': 'Alladin',
              'studio': {
                _id: expect.any(String),
                name: expect.any(String)
              },
              'released': 1977,
              'cast': [{
                '_id': expect.any(String),
                'role': 'champ',
                'actor': {
                  _id: expect.any(String),
                  name: expect.any(String)
                }
              }]
            });
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
          expect(body[0]).toEqual(
            {
              __v: 0,
              _id: expect.any(String),
              'title': 'Alladin',
              'studio': {
                _id: expect.any(String),
                name: expect.any(String)
              },
              'released': 1977,
            },
          );
        });
    });
  });
});

module.exports = { postFilm };