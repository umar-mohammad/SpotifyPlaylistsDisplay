import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/" className="navigation-link">
                    <li>Home</li>
                </Link>
                <Link to="/playlists" className="navigation-link">
                    <li>Playlists</li>
                </Link>
                <Link to="/top" className="navigation-link">
                    <li>Top</li>
                </Link>
                <Link to="/compare" className="navigation-link">
                    <li>Compare</li>
                </Link>
                <Link id="about-link" to="/about" className="navigation-link">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
}
export default Nav;
