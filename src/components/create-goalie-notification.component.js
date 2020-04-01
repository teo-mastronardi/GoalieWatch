import React, { Component } from 'react';
import Axios from 'axios';
//import Select from 'react-select';

export default class CreateGoalieNotification extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername   = this.onChangeUsername.bind(this);
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
            goalies: []
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
        Axios.get('http://localhost:8080/goalies/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState ({
                    goalies: response.data.map(goalie => goalie.goalie_name),
                    goalie_name: response.data[0].goalie_name
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

        const goalieRequest = 
        {
            username:    this.state.username,
            goalie_id:   this.state.goalie_id,
            goalie_name: this.state.goalie_name,
            reminder:    this.state.reminder
        }

        console.log(goalieRequest);

        //Navigator
        //window.location = '/';
        Axios.post('http://localhost:8080/goalieRequest/add/', goalieRequest);
    }

    render()
    {
        return (
            <div>
            <h3>Setup your custom notification</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Username: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
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
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.goalie_name}
                    onChange={this.onChangeGoalieName}>
                    {
                      this.state.goalies.map(function(goalie) {
                        return <option 
                          key={goalie}
                          value={goalie}>{goalie}
                          </option>;
                      })
                    }
                </select>
            </div>
            <div className="form-group"> 
                <label>Reminder (in minutes): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.reminder}
                    onChange={this.onChangeReminder}
                    />
            </div>

            <div className="form-group">
                <input type="submit" value="Submit Notifcation" className="btn btn-primary" />
            </div>
            </form>
          </div>
        )
    }
}