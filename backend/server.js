/*
GOALIEWATCH BACKEND SERVER
--------------------------------

Connecting to backend Atlas MongoDB database
Deploying express server to handle requests sent by client
Cron job scheduler handling NHL API scrape

--------------------------------
*/

// Declarations and packages included
try
{
  var express        = require('express');
  var app            = express();
  var mongoose       = require('mongoose');
  var session        = require('express-session');
  var cors           = require('cors');
  var port           = 8080;
  var cron           = require('node-cron');
  var shell          = require('shelljs');
  var fs             = require("fs");
  
  require('dotenv').config();

// Including required middleware
  app.use(cors());
  app.use(express.json());
  app.use(session (
  {
    secret: 'Session test', 
    saveUninitialized: true,
    resave: true
  }));
  
  console.log("\nAll necessary packages included...");
}
catch(e) {console.log("Errors including packages: " + (e));}

// Connecting to Atlas MongoDB 
try 
{
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

  const connection = mongoose.connection;
  connection.once('open', () => 
  {
    console.log("\nMongoDB Atlas connection successful!\n");
  });
}
catch (e) 
{
  console.log("Error connecting to MongoDB database: " + e);
}

// Routes 
var usersRouter  = require('./routes/users.js');
var goalieRouter = require('./routes/goalies.js');

app.use('/users', usersRouter);
app.use('/goalies', goalieRouter);

// Cron job running NHL API goalie scrape running every 24 hours
console.log("Cron scheduler ready...");
cron.schedule("10 * * * * *", function() {
// cron.schedule("* 59 23 * * *", function() {
  console.log("Scheduler running goalie cron job...");
  if (shell.exec("python goalieCron.py").code !== 0) {
    console.log("Cron job did not successfully run");
  }
});

// Listening to requests sent by client
app.listen(port, function() 
{
  console.log('Server deployed...\n' + 'Listening at address localhost:' + port + '\n');
});
