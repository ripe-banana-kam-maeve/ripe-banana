// eslint-disable-next-line new-cap
const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Actor.findById(req.params.id)
        .lean(),
      Film.find({ cast: req.params.id })
        .select('id title released')
        .lean()
    ])
      .then(([actors, films]) => {
        res.json(actors, films);
      })
      .catch(next);
  });



module.exports = router;