//const request = require('../request');
const db = require('../db');
//const { postFilm } = require('../../e2e/__tests__/films.test');
const { postReviewer } = require('../__tests__/reviewers.test');

describe('reviews', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('reviews'),
      db.dropCollection('films')
    ]);
  });

  const fakeGuy = {
    name: 'Dwane the Rock Johnson',
    company: 'School of Hard Knocks'
  };
  // const toyStory = {
  //   title: 'Alladin',
  //   studio: { _id: expect.any(String), name: expect.any(String) },
  //   released: 1977,
  //   cast: [
  //     {
  //       _id: expect.any(String),
  //       role: 'champ',
  //       actor: { _id: expect.any(String), name: expect.any(String) }
  //     }
  //   ]
  // };

  const data = {
    rating: 4,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };

  function postReview(data) {
    return postReviewer(fakeGuy).then(reviewer => {
      console.log(data.reviewer);
      data.reviewer = reviewer;
    })
      .post('/api/reviews')
      .send(data)
      .expect(200)
      .then(({ body }) => {
        return body;
      });
  }
  it('posts an review', () => {
    return postReview(data).then(review => {
      console.log(review);
      expect(review).toEqual(6);
    });
  });
});