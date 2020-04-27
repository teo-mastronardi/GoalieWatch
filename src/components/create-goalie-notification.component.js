import React, { Component } from 'react';
import Axios from 'axios';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
// import { filterBy } from '@progress/kendo-data-query';

export default class CreateGoalieNotification extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangeGoalieName = this.onChangeGoalieName.bind(this);
        this.onChangeReminder   = this.onChangeReminder.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            email: '',
            goalie_name: '',
            reminder: '',
            goalies: []
        }
    }

    onChangeEmail (e)
    {
        this.setState
        ({
            email: e.target.value
        });
    }

    onChangeGoalieName (e)
    {
        this.setState
        ({
            goalie_name: e.target.value
        });
    }

    // onFilterChange (e)
    // {
    //     Axios.get('http://localhost:8080/goalies/')
    //     .then(response => {
    //         if (response.data.length > 0) {
    //             this.setState ({
    //                 teams:     response.data.map(team_name => goalie.team_name),
    //                 team_name: response.data[0].team_name
    //             })
    //         } 
    //         data: filterBy(team_name.slice(), e)
    //     })
    // }

    onChangeReminder (e)
    {
        this.setState
        ({
            reminder: e.target.value
        });
    }

    componentDidMount()
    {
        Axios.get('http://localhost:8080/goalies/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState ({
                    goalies:     response.data.map(goalie => goalie.goalie_name),
                    goalie_name: response.data[0].goalie_name
                })
            }
        })
    }

    onSubmit (e)
    {
        e.preventDefault();

        const goalieRequest = 
        {
            email:       this.state.email,
            goalie_name: this.state.goalie_name,
            reminder:    this.state.reminder
        }

        console.log(goalieRequest);

        // Nav to add another request on submit
        Axios.post('http://localhost:8080/goalieRequest/add/', goalieRequest);
    }

    render()
    {
        return (
            <div>
            <h3>Setup your custom notification</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
            </div>
            <div> 
                <label>Select Goalies: </label>
                {/* <select ref="userInput"
                    required
                    className="form-control"
                    //value={this.state.goalie_name}
                    onChange={this.onChangeGoalieName}>
                    {
                      this.state.goalies.map(function(goalie) {
                        return <option 
                          key={goalie}
                          value={goalie}>{goalie}
                          </option>;
                      })
                    }
                </select> */}
                <div>
                    <MultiSelect
                        data={this.state.goalies.map(function(goalie) {
                                return goalie;
                            })}
                        filterable={true}
                        onFilterChange={this.onFilterChange}
                        onChange={this.onChangeGoalieName}
                        value={this.state.value}
                    />
                </div>
                <br/>
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