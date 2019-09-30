// eslint-disable-next-line new-cap
const router = require('express').Router();
const Studio = require('../models/studio');
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.json(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio.findById(req.params.id)
      .populate('studio', 'name address')
      .then(studio => res.json(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Film.find({ studio: req.params.id })
        .select('title')
        .lean(),
      Studio.findById(req.params.id)
        .lean()
    ])
      .then(([films, studio]) => {
        studio.films = films;
        res.json(studio);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film.exists({ studio: req.params.id })
      .then(exists => {
        if(exists) {
          throw { 'statusCode': 500, 'error': `Can't be deleted` };
        }
        Studio.findByIdAndRemove(req.params.id)
          .then(studio => res.json(studio))
          .catch(next);
      });
  });

module.exports = router;