// creating routes for users goalie requests

const router = require('express').Router();
let GoalieRequest = require('../models/goalie.request.model.js');

// Pulling all requests from database
router.route('/').get((req, res) => 
{
    GoalieRequest.find()
      .then(goalieRequest => res.json(goalieRequest))
      .catch(err => res.status(400).json('Unable to pull existing requests \n' + err)); 
});

// Adding notification request to the database
router.route('/add').post((req, res) =>
{
    const email       = req.body.email;
    const goalie_name = req.body.goalie_name;
    const reminder    = req.body.reminder;

    const newGoalieRequest = new GoalieRequest({
        email,
        goalie_name,
        reminder,
    });

    console.log(newGoalieRequest);

    newGoalieRequest.save()
      .then( () => res.json('Goalie request added!'))
      .catch((err => res.status(400).json('Error saving request \n' + err)));
});

// Getting requests by id param
router.route('/:id').get((req, res) => 
{
    GoalieRequest.findById(req.params.id)
      .then(goalieRequest => res.json(goalieRequest))
      .catch(err => res.status(400).json('Unable to pull existing requests by id \n' + err));
});

// Deleting request by id param
router.route('/update/:id').delete((req, res) => 
{
    GoalieRequest.findByIdAndDelete(req.params.id)
      .then(() => res.json('Request deleted!'))
      .catch(err => res.json('Error deleting request \n' + err));
});

// Update current requests by id
router.route('/update/:id').post((req, res) => 
{
    GoalieRequest.findByIdAndUpdate(req.params.id)
      .then(goalieRequest => 
        {
            goalieRequest.email       = req.body.email;
            goalieRequest.goalie_name = req.body.goalie_name;
            goalieRequest.reminder    = req.body.reminder;
          
            goalieRequest.save()
              .then(() => res.json('Goalie request successfully updated'))
              .catch(err => res.json('Unable to update the goalie request \n' + err));
        })
       .catch(err => res.status(400).json('Unable to update id \n' + err));
});

module.exports = router;