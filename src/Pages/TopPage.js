import React, { Component } from "react";
import queryString from "query-string";
import "./../App.css";
import Playlist from "./../Components/Playlist";
import PlaylistCounter from "./../Components/PlaylistCounter";
import HoursCounter from "./../Components/HoursCounter";
import Filter from "./../Components/Filter";
import logo from "./../Images/spotify/spotify_logo.svg";

class TopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterString: "",
        };
        console.log(props.isLogged);
    }

    fetchUserData(accessToken) {
        fetch("https://api.spotify.com/v1/me", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    user: {
                        name: data.display_name,
                    },
                })
            );
    }

    fetchPlaylistData(accessToken) {
        fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = this.props.accessToken || parsed.access_token;
        if (!accessToken) return;
    }

    render() {
        let playlistsToRender =
            this.state.user && this.state.playlists
                ? this.state.playlists.filter((playlist) =>
                      playlist.name
                          .toLowerCase()
                          .includes(this.state.filterString.toLowerCase())
                  )
                : [];
        return (
            <div className="playlist-page">
                {this.props.isLogged ? (
                    <div>
                        {this.state.user && (
                            <div>
                                <h1 style={{ "margin-top": "7.5%" }}>
                                    {this.state.user.name}'s playlists
                                </h1>
                                <PlaylistCounter
                                    playlists={playlistsToRender}
                                />
                                <HoursCounter playlists={playlistsToRender} />
                                <Filter
                                    onTextChange={(text) =>
                                        this.setState({ filterString: text })
                                    }
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        "flex-wrap": "wrap",
                                        margin: "10px",
                                    }}
                                >
                                    {playlistsToRender.map((playlist) => (
                                        <Playlist playlist={playlist} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="playlist-page">
                        <h1 className="big-font">
                            Let's get you signed in first
                        </h1>
                        <button
                            className="login-button"
                            onClick={() => {
                                window.location = window.location.href.includes(
                                    "localhost"
                                )
                                    ? "http://localhost:8888/login"
                                    : "https://spotify-display-backend.herokuapp.com/login";
                            }}
                            style={{
                                display: "inline-block",
                            }}
                        >
                            Sign in with{" "}
                            <img
                                className="spotify-logo-image"
                                src={logo}
                                alt="Logo"
                            />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default TopPage;
