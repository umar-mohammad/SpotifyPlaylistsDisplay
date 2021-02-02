import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import "./App.css";
import Nav from "./Components/Nav";
import PlaylistPage from "./Pages/PlaylistPage";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import TopPage from "./Pages/TopPage";
import ComparisonPage from "./Pages/ComparisonPage";

class App extends Component {
    constructor() {
        super();
        this.state = {
            logged: false,
            access_token: null,
            artist_data: null,
            user: null,
            playlists: null,
        };
        this.login.bind(this);
        this.getAccessToken.bind(this);
        this.getArtistData.bind(this);
        this.getUserData.bind(this);
        this.getPlaylistsData.bind(this);
    }

    login = () => {
        this.setState(
            {
                logged: true,
            } /*, () =>
            console.log("logged status: " + this.state.logged)*/
        );
    };

    getAccessToken = (token) => {
        this.setState(
            {
                access_token: token,
            } /*, () =>
            console.log("got access token: " + this.state.access_token)*/
        );
    };

    getArtistData = (data) => {
        if (data === null) {
            console.log(`got null artist data`);
            return;
        }
        this.setState(
            {
                artist_data: data,
            } /*,
            console.log(`got artist data from child ${this.state.artist_data}`)*/
        );
    };

    getUserData = (data) => {
        if (data === null) {
            console.log(`got null user data`);
            return;
        }
        this.setState(
            {
                user: { name: data },
            } /*,
            console.log(`got artist data from child ${this.state.artist_data}`)*/
        );
    };

    getPlaylistsData = (data) => {
        if (data === null) {
            console.log(`got null playlist data`);
            return;
        }
        this.setState(
            {
                playlists: data,
            } /*,
            console.log(`got playlist data from child ${data}`)*/
        );
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={HomePage}></Route>
                        <Route
                            path="/playlists"
                            render={(props) => (
                                <PlaylistPage
                                    {...props}
                                    login={this.login}
                                    sendAccessToken={this.getAccessToken}
                                    sendUserData={this.getUserData}
                                    sendPlaylistData={this.getPlaylistsData}
                                    user={this.state.user}
                                    playlists={this.state.playlists}
                                    isLogged={this.state.logged}
                                    accessToken={this.state.access_token}
                                />
                            )}
                        ></Route>
                        <Route
                            path="/top"
                            render={(props) => (
                                <TopPage
                                    {...props}
                                    login={this.login}
                                    sendAccessToken={this.getAccessToken}
                                    sendUserData={this.getUserData}
                                    sendArtistData={this.getArtistData}
                                    user={this.state.user}
                                    artistData={this.state.artist_data}
                                    isLogged={this.state.logged}
                                    accessToken={this.state.access_token}
                                />
                            )}
                        ></Route>
                        <Route
                            path="/compare"
                            render={(props) => (
                                <ComparisonPage
                                    {...props}
                                    login={this.login}
                                    sendAccessToken={this.getAccessToken}
                                    sendUserData={this.getUserData}
                                    sendArtistData={this.getArtistData}
                                    sendPlaylistData={this.getPlaylistsData}
                                    user={this.state.user}
                                    artistData={this.state.artist_data}
                                    playlists={this.state.playlists}
                                    isLogged={this.state.logged}
                                    accessToken={this.state.access_token}
                                />
                            )}
                        ></Route>
                        <Route path="/about" component={AboutPage}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
