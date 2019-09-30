const request = require('../request');
const db = require('../db');
const { postFilm } = require('../../e2e/__tests__/films.test');
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
  const toyStory = {
    title: 'Alladin',
    studio: { _id: expect.any(String), name: expect.any(String) },
    released: 1977,
    cast: [
      {
        _id: expect.any(String),
        role: 'champ',
        actor: { _id: expect.any(String), name: expect.any(String) }
      }
    ]
  };

  const testReview = {
    rating: 4,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };

  function postReview(testReview) {
    return Promise.all([
      postReviewer(fakeGuy), postFilm(toyStory)
    ])
      .then(([reviewer, film]) => {
        testReview.film = film;
        testReview.reviewer = reviewer;
        console.log('fasdf', testReview);
        return request
          .post('/api/reviews')
          .send(testReview)
          .expect(200);
      })
      .then(({ body }) => {
        return body;
      });
  }
  it('posts an review', () => {
    return postReview(testReview).then(review => {
      console.log(review);
      expect(review).toEqual(
        { '__v': 0, '_id': expect.any(String), 'film': expect.any(String), 'rating': 4, 'review': 'was bad', 'reviewer': expect.any(String) }
      );
    });
  });
});