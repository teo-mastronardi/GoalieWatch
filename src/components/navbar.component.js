import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component 
{    
    render () 
    {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/emaildevs"><i className="fa fa-envelope mr-1"></i></a>
                    </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto" href="/">GoalieWatch</a>
                <button className="navbar-toggler" type="button" data-target=".dual-collapse2">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li>
                    <a className="nav-link" href="/login"><i className="fa fa-user-o"></i> Edit Request</a>
                    </li> 
                </ul>
            </div>
            </nav>
        );
    }
}