// creating routes to pull goalies

const router = require('express').Router();
let Goalies = require('../models/goalie.model.js');

// pull all scraped goalies from database
router.route('/').get((req, res) =>
{
    Goalies.find()
       .then(goalies => res.json(goalies))
       .catch(err => res.status(400).json('Unable to pull goalies ' + err));
});

module.exports = router;