const request = require('../request');
const db = require('../db');

describe('studios', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const john = {
    name: 'John Travolta',
    birthYear: 1953
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
        .post('/api/actors')
        .send(john)
        .expect(200)
        .then(() => {
          return request.get(`/api/actors/${actor._id}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },

            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "birthYear": 1953,
              "name": "John Travolta",
            }
          `
          );
        });
    });
  });
});
