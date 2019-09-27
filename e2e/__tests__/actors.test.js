const request = require('../request');
const db = require('../db');

describe('actors', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const john = {
    name: 'Jhonny Depp',
    dob: 'March 23rd 1957',
    pob: 'Pittsburg, PA'
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
      return request
        .post('/api/films')
        .send({
          title: 'Alladin',
          studio: 'mgm',
          released: 1977,
          cast: [{ role: 'champ', actor: actor._id }]
        })
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
});
