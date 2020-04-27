// creating routes for users goalie requests

const router = require('express').Router();
let GoalieRequest = require('../models/goalie.request.model.js');

// Pulling all requests from database
router.route('/').get((req, res) => 
{
    GoalieRequest.find()
      .then(goalieRequest => {
        return res.json(goalieRequest);
      })
      .catch(err => {
        return res.status(400).json('Unable to pull existing requests \n' + err);
      }); 
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

    newGoalieRequest.save()
      .then( () => {
        return res.status(201).json('Goalie request added!');
      })
      .catch((err => {
        return res.status(400).json('Error saving request \n' + err);
      }));
});

// Getting requests by id param
router.route('/:id').get((req, res) => 
{
    GoalieRequest.findById(req.params.id)
      .then(goalieRequest => {
        return res.status(201).json(goalieRequest);
      })
      .catch(err => {
        return res.status(400).json('Unable to pull existing requests by id \n' + err);
      });
});

// Deleting request by id param
router.route('/update/:id').delete((req, res) => 
{
    GoalieRequest.findByIdAndDelete(req.params.id)
      .then(() => {
        return res.status(200).json('Request deleted!');
      })
      .catch(err => {
        return res.status(400).json('Error deleting request \n' + err);
      });
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
              .then(() => {
                return res.status(200).json('Goalie request successfully updated');
              })
              .catch(err => {
                return res.status(400).json('Unable to update the goalie request \n' + err);
              });
        })
       .catch(err => {
            return res.status(400).json('Unable to update id \n' + err)
        });
});

module.exports = router;