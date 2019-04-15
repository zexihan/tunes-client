import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import port from './port.js';

import Landing from './views/Landing';
import Searching from './views/Searching';
import User from './views/User';
import Track from './views/Track';
import Joinus from './views/Joinus';

import Artist from './views/Artist';
import Album from './views/Album';
import ProfileEditor from "./views/ProfileEditor";
import NavBar from './components/NavBar';

import UserService from './services/UserService';
let userService = UserService.getInstance();

class RouterBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      logoutStatus: false
    }
  }

  search = (subjects) => {
    this.setState({
      subjects
    });
    console.log(subjects);
  }

  logout = () => {
    this.setState({
      logoutStatus: true
    })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar logout={this.logout} />
            <Route
              path="/joinus"
              exact
              render={props => <Joinus {...props} search={this.search} />}
            />
            <Route
              path="/"
              exact
              render={props => <Landing {...props} search={this.search} />}
            />
            <Route
              path="/subject_search"
              exact
              render={props => (
                <Searching {...props} subjects={this.state.subjects} />
              )}
            />
            <Route
              path="/track/:id"
              exact
              render={props => (
                <Track {...props} logoutStatus={this.state.logoutStatus} />
              )}
            />
            <Route
              path="/artist/:id"
              exact
              render={props => (
                <Artist {...props} logoutStatus={this.state.logoutStatus} />
              )}
            />
            <Route
              path="/album/:id"
              exact
              render={props => (
                <Album {...props} logoutStatus={this.state.logoutStatus} />
              )}
            />
            <Route
              path="/user/:id"
              exact
              render={props => (
                <User {...props} logoutStatus={this.state.logoutStatus} />
              )}
            />
            <Route
              path="/profile"
              exact
              render={props => (
                <ProfileEditor
                  {...props}
                  logoutStatus={this.state.logoutStatus}
                />
              )}
            />
          </div>
        </Router>
        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Log In to Connect
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row m-3">
                  <div className="col">
                    <a href={port + "/login/spotify-auth"} target="_blank">
                      <button
                        type="button"
                        className="btn btn-success btn-block"
                      >
                        <i className="fab fa-spotify" /> Log in with Spotify
                      </button>
                    </a>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col text-center">
                    Refresh me to be logged in on this page after spotify
                    signin
                    {/* Don't have an account? <a id="sign-up" href="https://www.spotify.com/us/signup/?forward_url=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5000%252Flogin%252Fspotify-auth%252Fcallback%26scope%3Duser-read-email%2520user-read-private%26client_id%3Da1e8617e0c7648d99634ae3a3d192590">Sign up for Spotify</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RouterBoard;
