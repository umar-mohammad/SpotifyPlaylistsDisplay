import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import "./App.css";
import Nav from "./Components/Nav";
import PlaylistPage from "./Pages/PlaylistPage";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={HomePage}></Route>
                        <Route
                            path="/playlists"
                            component={PlaylistPage}
                        ></Route>
                        <Route path="/about" component={AboutPage}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
