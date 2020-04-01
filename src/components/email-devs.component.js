import React, { Component } from 'react';
import Axios from 'axios';

export default class EmailDevs extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername   = this.onChangeUsername.bind(this);
        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangeSubject    = this.onChangeSubject.bind(this);
        this.onChangeBody       = this.onChangeBody.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            username: '',
            email: '',
            subject: '',
            body: '',
        }
    }

    onChangeUsername (e)
    {
        this.setState
        ({
            username: e.target.value
        });
    }

    onChangeEmail (e)
    {
        this.setState
        ({
            email: e.target.value
        });
    }

    onChangeSubject (e)
    {
        this.setState
        ({
            subject: e.target.value
        });
    }

    onChangeBody (e)
    {
        this.setState
        ({
            body: e.target.value
        });
    }

    onSubmit (e)
    {
        e.preventDefault();

        const email = 
        {
            username: this.state.username,
            email:    this.state.email,
            subject:  this.state.subject,
            body:     this.state.body
        }

        console.log(email);

        // Sending input data to the backend to use API to handle request
        Axios.post('http://localhost:8080/users/add', email)
            .then(res => console.log(res.data));
            //.catch(err => console.log("Unable to send username to bacnekend " + err));

        //Reset the fields
        this.setState
        ({
            username:'',
            email:'',
            subject: '',
            body: ''
        })
    }

    render()
    {
        return (
        <div>
            <h3>Send devs issues</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
                <label>Subject: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeSubject}
                />
                <label>Body: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeBody}
                />
              </div>       
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary"/>
            </div>
            </form>
        </div>
        )
    }
}