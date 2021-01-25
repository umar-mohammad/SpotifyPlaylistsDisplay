import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import "./App.css";
import Nav from "./Components/Nav";
import PlaylistPage from "./Pages/PlaylistPage";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";

class App extends Component {
    constructor() {
        super();
        this.state = { logged: false, access_token: null };
        this.login.bind(this);
        this.getAccessToken.bind(this);
    }

    login = () => {
        this.setState({ logged: true }, () =>
            console.log("logged status: " + this.state.logged)
        );
    };

    getAccessToken = (token) => {
        this.setState({ access_token: token }, () =>
            console.log("got access token: " + this.state.access_token)
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
