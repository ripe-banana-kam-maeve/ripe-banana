const request = require('../request');
const db = require('../db');

describe('reviewer api', () => {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });
  const fakeGuy = {
    name: 'bob',
    publication: 'nytimes',
    yearsPub: 4,
    print: true
  };

  function postReviewer(fakeGuy) {
    return request
      .post('/api/reviewers')
      .send(fakeGuy)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an reviewer', () => {
    return postReviewer(fakeGuy).then(reviewer => {
      expect(reviewer).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...fakeGuy
      });
    });
  });

  it('get reviewer by id', () => {
    return postReviewer(fakeGuy).then(reviewers => {
      return request
        .post('/api/reviewers')
        .send(fakeGuy)
        .expect(200)
        .then(() => {
          return request.get(`/api/reviewers/${reviewers._id}`).expect(200);
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
              "name": "bob",
              "print": true,
              "publication": "nytimes",
              "yearsPub": 4,
            }
          `
          );
        });
    });
  });

  it('get all reviewers', () => {
    return postReviewer(fakeGuy).then(() => {
      return request
        .post('/api/reviewers')
        .send(fakeGuy)
        .expect(200)
        .then(() => {
          return request.get(`/api/reviewers`).expect(200);
        })
        .then(({ body }) => {
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },

            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "name": "bob",
              "print": true,
              "publication": "nytimes",
              "yearsPub": 4,
            }
          `
          );
        });
    });
  });

  it('updates a reviewer', () => {
    return postReviewer(fakeGuy)
      .then(reviewer => {
        reviewer.publication = 'fakestuff';
        return request
          .put(`/api/reviewers/${reviewer._id}`)
          .send(reviewer)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.publication).toBe('fakestuff');
      });
  });
});
