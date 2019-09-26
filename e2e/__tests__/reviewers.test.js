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
});