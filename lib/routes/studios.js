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
    Film.findById(req.params.id)
      .lean(),
    Studio.find({ cast: req.params.id })
      .select('id name address films')
      .lean()
      .then(([films, studios]) => {
        res.json(films, studios);
      })
      .catch(next);
  });


module.exports = router;