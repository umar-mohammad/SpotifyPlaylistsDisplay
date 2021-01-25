import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Nav from "./Components/Nav";
import PlaylistPage from "./Pages/PlaylistPage";
import AboutPage from "./Pages/AboutPage";

let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,
};

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Route path="/playlists" component={PlaylistPage}></Route>
                    <Route path="/about" component={AboutPage}></Route>
                </div>
            </Router>
        );
    }
}

export default App;
