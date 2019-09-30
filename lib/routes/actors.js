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
  
  .get('/', (req, res, next) => {
    Actor.find(req.params)
      .select('name')
      .then(actor => res.json(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Actor.findById(req.params.id)
        .select('name dob pob films')
        .lean(),
      Film.where('cast.actor', req.params.id)
        .select('title released') 
    ])
      .then(([actor, films]) => {
        actor.films = films;
        res.json(actor);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film.exists({ 'cast.actor': req.params.id })
      .then(exists => {
        if(exists) {
          throw { 'statusCode': 500, 'error': `Can't be deleted` };
        }
        Actor.findByIdAndRemove(req.params.id)
          .then(studio => res.json(studio))
          .catch(next);
      });
  });

module.exports = router;