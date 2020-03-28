// creating routes for user goalie requests
// using the goalie model

const router = require('express').Router();
let Goalie = require('../models/goalie.model.js');

// Pulling all requests from database
router.route('/').get((req, res) => 
{
    Goalie.find()
      .then(goalie => res.json(goalie))
      .catch(err => res.status(400).json('Unable to pull existing requests \n' + err)); 
});

// Adding notification request to the database
router.route('/add').post((req, res) =>
{
    const username    = req.body.username;
    const goalie_id   = req.body.goalie_id;
    const goalie_name = req.body.goalie_name;
    const reminder    = req.body.reminder;

    const newGoalie = new Goalie({
        username,
        goalie_id,
        goalie_name,
        reminder,
    });

    newGoalie.save()
      .then( () => res.json('Goalie request added!'))
      .catch((err => res.status(400).json('Error saving request \n' + err)));
});

// Getting requests by id param
router.route('/:id').get((req, res) => 
{
    Goalie.findById(req.params.id)
      .then(goalie => res.json(goalie))
      .catch(err => res.status(400).json('Unable to pull existing requests by id \n' + err));
});

// Deleting request by id param
router.route('/update/:id').delete((req, res) => 
{
    Goalie.findByIdAndDelete(req.params.id)
      .then(() => res.json('Request deleted!'))
      .catch(err => res.json('Error deleting request \n' + err));
});

// Update current requests by id
router.route('/update/:id').post((req, res) => 
{
    Goalie.findByIdAndUpdate(req.params.id)
      .then(goalie => 
        {
            goalie.username    = req.body.username;
            goalie.goalie_id   = req.body.goalie_id;
            goalie.goalie_name = req.body.goalie_name;
            goalie.reminder    = req.body.reminder;
          
            goalie.save()
              .then(() => res.json('Goalie request successfully updated'))
              .catch(err => res.json('Unable to update the goalie request \n' + err));
        })
       .catch(err => res.status(400).json('Unable to update id \n' + err));
});

module.exports = router;