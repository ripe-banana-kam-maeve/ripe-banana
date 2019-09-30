// eslint-disable-next-line new-cap
const router = require('express').Router();
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    Film.create(req.body)
      .then(film => res.json(film))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film.findById(req.params.id)
      .populate('films', 'title released studio cast cast.actor reviews')
      .then(film => res.json(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film.find()
      .then(film => res.json(film))
      .catch(next);
  });

module.exports = router;