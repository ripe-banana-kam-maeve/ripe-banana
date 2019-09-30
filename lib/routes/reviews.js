// eslint-disable-next-line new-cap
const router = require('express').Router();
const Review = require('../models/review');

router
  .post('/', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.json(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review.find()
      .populate('film', 'title')
      .select('rating review film')
      .sort({ 'rating': -1 })
      .limit(100)
      .then(review => res.json(review))
      .catch(next);
  });

module.exports = router;