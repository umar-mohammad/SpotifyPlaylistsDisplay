import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/" className="home-link">
                    <li>Home</li>
                </Link>
                <Link to="/playlists" className="playlist-link">
                    <li>Playlists</li>
                </Link>
                <Link to="/about" className="about-link">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
}
export default Nav;
