import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Included components
import Navbar from "./components/navbar.component";
import GoalieList from "./components/goalie-list.component";
import CreateGoalie from "./components/create-goalie.component";
import EditGoalie from "./components/edit-goalie.component";
import CreateUser from "./components/create-user.component";

function App() 
{
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={GoalieList} />
        <Route path="/edit/:id" component={EditGoalie} />
        <Route path="/create" component={CreateGoalie} />
        <Route path="/user" component={CreateUser} />
        </div>
    </Router>
  );
}

export default App;