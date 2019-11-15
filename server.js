/*
GOALIEWATCH BACKEND SERVER
--------------------------------

Connecting to backend MongoDB database
Deploying express server to handle requests sent by client

Register
- Storing register information into mongoDB

Login
- Search database for login information, pull that record

TODO
- If theres a match, set session variables
- If not, no account exists, please register

Request
- Submit goalie request using login information with session variables

--------------------------------
*/

// Declarations and packages included
try
{
  var express          = require('express');
  var app              = express();
  var bodyParser       = require('body-parser');
  var mongoose         = require('mongoose');
  var cookieParser     = require('cookie-Parser');
  var session          = require('express-session');
  var port             = 8080;
  var connectionString = 'mongodb://localhost:27017/goaliewatchers';
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({secret: "Your session is a secret"}));
  
  console.log("\nAll necessary packages included...");
}
catch(e) {console.log("Errors including packages: " + (e));}

// Connecting to database
mongoose.Promise = global.Promise;
try 
{
  mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
  console.log("\nMongoDB connection successful!\n");
}
catch (e) {console.log("Error connecting to MongoDB database: " + e);}

// Building collections to insert into DB, new document for each user registration
var account_schema = new mongoose.Schema(
  {
    first_name:   
    {
      type: String, 
    },
    last_name:    
    {
      type: String, 
    },
    email:
    {
      type: String, 
    },
    password:    
    {
      type: String, 
    },
    date_created: {type: Date, default: Date.now()}
  })

var account = mongoose.model("account", account_schema);

// POST request for pulling registration from web page and storing in database
app.post('/register', function(req, res)
{
  var formData = 
  {
    first_name: req.body.inputfName,
    last_name:  req.body.inputlName,
    email:      req.body.inputEmail,
    password:   req.body.inputPassword
  }

 new account(formData).save()
 .then( 
    item => 
    {
      //res.send("Items sent to database");

      var output = '<html><header>Muthafuckin stored</header></html>'
      res.send(output);
      //res.redirect("/C:/Users/larse/Documents/GitHub/GoalieWatch/frontend/index.html");
      //pop up with module saving account registered!
    })
  .catch(err => 
    {
      res.status(400).send("Unable to save to database");
    })
});

// POST request for signing in
app.post("/signin", function(req, res)
{
  var email    = req.body.inputEmail;
  var password = req.body.inputPassword;

  mongoose.connection.collection("accounts").find( {"email": email, "password": password}).toArray(function (err, result_account)
  {
    if (err) return handleError(err);
    console.log(result_account);

    // Checking if query returns a match to inputted email address
    if (result_account.length <= 0) console.log("Account does not exist");

    // Match found, build session for user
    else
    {
      console.log("Match found, lets being building the session!!!");
      
      
    }

  });


});

// POST request for pulling clients requests
app.post('/request', function(req, res)
{
  res.send(req.body);
});

// Listening to requests sent by client
app.listen(port, function() 
{
  console.log('Server deployed...\n' + 'Listening at address http://127.0.0.1:/' + 8080);
});