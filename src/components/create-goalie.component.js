import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateGoalie extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername   = this.onChangeGoalieName.bind(this);
        this.onChangeGoalieId   = this.onChangeGoalieId.bind(this);
        this.onChangeGoalieName = this.onChangeGoalieName.bind(this);
        this.onChangeReminder   = this.onChangeReminder.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            username: '',
            goalie_id:'',
            goalie_name:'',
            reminder:'',
            users: []
        }
    }

    onChangeUsername (e)
    {
        this.setState
        ({
            username: e.target.value
        });
    }

    componentDidMount()
    {
        Axios.get('http://localhost:8080/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState ({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }  
        })
    }

    onChangeGoalieId (e)
    {
        this.setState
        ({
            goalie_id: e.target.value
        });
    }

    onChangeGoalieName (e)
    {
        this.setState
        ({
            goalie_name: e.target.value
        });
    }

    onChangeReminder (e)
    {
        this.setState
        ({
            reminder: e.target.value
        });
    }

    onSubmit (e)
    {
        e.preventDefault();

        const goalie = 
        {
            username:    this.state.username,
            goalie_id:   this.state.goalie_id,
            goalie_name: this.state.goalie_name,
            reminder:    this.state.reminder
        }

        console.log(goalie);

        //Navigator
        //window.location = '/';
        Axios.post('http://localhost:8080/goalie/add', goalie);
    }

    render()
    {
        return (
            <div>
            <h3>Create New Goalie Requeest</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group">
                <label>Goalie Id: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.goalie_id}
                    onChange={this.onChangeGoalieId}
                    />
              </div>
              <div className="form-group"> 
                <label>Goalie Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.goalie_name}
                    onChange={this.onChangeGoalieName}
                    />
              </div>

              <div className="form-group"> 
                <label>Reminder (in minutes): </label>
                <input  type="number"
                    required
                    className="form-control"
                    value={this.state.reminder}
                    onChange={this.onChangeReminder}
                    />
              </div>

              <div className="form-group">
                <input type="submit" value="Create Goalie Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}