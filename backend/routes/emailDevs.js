//creating routes for users to send issues to dev team

const router = require('express').Router();
let Email = require('../models/email.devs.model.js');

// retrieve all emailed issues
router.route('/').get((req, res) => 
{
    Email.find()
      .then(emails => {
          return res.status(200).json(emails);
      })
      .catch(err => {
          return res.status(400).json("Unable to store email in database\n" + err);
      });
});

router.route('/add').post((req,res) =>
{
    const email   = req.body.email;
    const subject = req.body.subject;
    const body    = req.body.body;

    const newEmail = new Email ({
        email, 
        subject,
        body
    });

    console.log(newEmail);

    newEmail.save()
      .then( () => {
        return res.status(201).json('Ticket filed, the dev team will be in contact shortly');
      })
      .catch((err => {
        return res.status(400).json('Error saving ticket into database \n' + err)
      }));
});

module.exports = router;

// SETUP REQUEST TO PULL ALL EXISTING REQUESTS FOR REPORTING

// SETUP REQUEST FOR POSTING NEW ISSUES

// FIND ALL REQUESTS BY CERTAIN EMAIL TO VIEW ALL EXISTING ISSUES