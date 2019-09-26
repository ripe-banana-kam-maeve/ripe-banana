// eslint-disable-next-line new-cap
const router = require('express').Router();
const Actor = require('../models/actor');

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .populate('actors', 'name birthYear')
      .then(actor => res.json(actor))
      .catch(next);
  });

module.exports = router;