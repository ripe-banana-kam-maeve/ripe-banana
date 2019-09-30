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

  const testReview1 = {
    rating: 4,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };
  const testReview2 = {
    rating: 5,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };
  const testReview3 = {
    rating: 6,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };
  const testReview4 = {
    rating: 7,
    reviewer: expect.any(String),
    review: 'was bad',
    film: expect.any(String)
  };

  function postReview(testReview1) {
    return Promise.all([
      postReviewer(fakeGuy), postFilm(toyStory)
    ])
      .then(([reviewer, film]) => {
        testReview1.film = film;
        testReview1.reviewer = reviewer;
        return request
          .post('/api/reviews')
          .send(testReview1)
          .expect(200);
      })
      .then(({ body }) => {
        return body;
      });
  }
  it('posts an review', () => {
    return postReview(testReview1).then(review => {
      expect(review).toEqual(
        { '__v': 0, '_id': expect.any(String), 'film': expect.any(String), 'rating': 4, 'review': 'was bad', 'reviewer': expect.any(String) }
      );
    });
  });
  it('gets reviews', () => {
    return Promise.all([
      postReview(testReview1),
      postReview(testReview2),
      postReview(testReview3),
      postReview(testReview4)
    ])
      .then(([r1, r2, r3, r4]) => {
        return request
          .post(`/api/reviews`).send(r1).expect(200)
          .post(`/api/reviews`).send(r2).expect(200)
          .post(`/api/reviews`).send(r3).expect(200)
          .post(`/api/reviews`).send(r4).expect(200);
      })
      .then(({ body }) => {
        console.log('body', body);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },

        );
      });
  });
});