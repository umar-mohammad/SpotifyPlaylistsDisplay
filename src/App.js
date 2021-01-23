import React, { Component } from "react";
import "./App.css";
import queryString from "query-string";
let defaultTextColor = "#fff";

let defaultStyle = {
    color: defaultTextColor,
};

let fakeServerData = {
    user: {
        name: "Umar",
        playlists: [
            {
                name: "My favorites",
                songs: [
                    { name: "Beat It", duration: 1345 },
                    { name: "Cannelloni Makaroni", duration: 1236 },
                    { name: "Rosa helikopter", duration: 70000 },
                ],
            },
            {
                name: "Discover Weekly",
                songs: [
                    { name: "Beat It", duration: 1345 },
                    { name: "Cannelloni Makaroni", duration: 1236 },
                    { name: "Rosa helikopter", duration: 70000 },
                ],
            },
            {
                name: "Another playlist - the best!",
                songs: [
                    { name: "Beat It", duration: 1345 },
                    { name: "Hallelujah", duration: 1236 },
                    { name: "Rosa helikopter", duration: 70000 },
                ],
            },
            {
                name: "Playlist - yeah!",
                songs: [
                    { name: "Beat It", duration: 1345 },
                    { name: "Cannelloni Makaroni", duration: 1236 },
                    { name: "Hej Hej Monika", duration: 70000 },
                ],
            },
        ],
    },
};

class App extends Component {
    constructor() {
        super();
        this.state = { serverData: {}, filterString: "" };
    }
    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken) return;

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

        fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
            .then((playlistData) => {
                let playlists = playlistData.items;
                let trackDataPromises = playlists.map((playlist) => {
                    //take each playlist and fetch its tracks
                    let promises = fetch(playlist.tracks.href, {
                        headers: { Authorization: "Bearer " + accessToken },
                    });
                    //transform the array of response objects to array into json objects we can use
                    let tracksPromise = promises.then((response) =>
                        response.json()
                    );
                    return tracksPromise;
                });
                //when all the promises have delivered
                let playlistsPromise = Promise.all(trackDataPromises).then(
                    (tracks_in_playlists) => {
                        tracks_in_playlists.forEach((tracks, i) => {
                            //take array of tracks and add them to the corresponding playlist
                            playlists[i].tracks = tracks.items
                                .map((item) => item.track)
                                .map((trackData) =>
                                    trackData != null
                                        ? {
                                              name: trackData.name,
                                              duration:
                                                  trackData.duration_ms / 1000,
                                          }
                                        : ""
                                );
                        });
                        return playlists;
                    }
                );
                return playlistsPromise;
            })
            .then((playlists) =>
                this.setState({
                    playlists: playlists.map((playlist) => {
                        return {
                            name: playlist.name,
                            imageUrl: playlist.images[0].url,
                            songs: playlist.tracks,
                        };
                    }),
                })
            );
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
            <div className="App">
                {this.state.user ? (
                    <div>
                        <h1>{this.state.user.name}'s playlists</h1>
                        <PlaylistCounter playlists={playlistsToRender} />
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
                ) : (
                    <button
                        onClick={() => {
                            window.location = window.location.href.includes(
                                "localhost"
                            )
                                ? "http://localhost:8888/login"
                                : "https://spotify-display-backend.herokuapp.com/login";
                        }}
                        style={{
                            padding: "20px",
                            "font-size": "50px",
                            "margin-top": "20px",
                        }}
                    >
                        Sign in with Spotify
                    </button>
                )}
            </div>
        );
    }
}

class PlaylistCounter extends Component {
    render() {
        return (
            <div
                style={{
                    ...defaultStyle,
                    width: "40%",
                    display: "inline-block",
                }}
            >
                <h2 style={{ color: "#fff" }}>
                    {this.props.playlists.length} Playlists
                </h2>
            </div>
        );
    }
}

class HoursCounter extends Component {
    render() {
        let songs = this.props.playlists.reduce((songs, playlist) => {
            return songs.concat(playlist.songs);
        }, []);
        let totalDuration = songs.reduce((sum, song) => {
            return sum + (isNaN(song.duration) ? 0 : song.duration);
        }, 0);
        return (
            <div
                style={{
                    ...defaultStyle,
                    width: "40%",
                    display: "inline-block",
                }}
            >
                {Math.round(totalDuration / 60) < 60 ? (
                    <h2 style={{ color: "#fff" }}>
                        {Math.round(totalDuration / 60)} Minutes
                    </h2>
                ) : (
                    <h2 style={{ color: "#fff" }}>
                        {Math.round(totalDuration / (60 * 60))} Hours
                    </h2>
                )}
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <div style={defaultStyle}>
                <img />
                <input
                    type="text"
                    onKeyUp={(event) =>
                        this.props.onTextChange(event.target.value)
                    }
                />
            </div>
        );
    }
}

class Playlist extends Component {
    render() {
        return (
            <div
                style={{
                    ...defaultStyle,
                    width: "25%",
                    display: "inline-block",
                }}
            >
                <img
                    src={this.props.playlist.imageUrl}
                    style={{
                        padding: "20px",
                        width: "300px",
                    }}
                />
                <h3>{this.props.playlist.name}</h3>
                <ul>
                    {this.props.playlist.songs.slice(0, 3).map((song) => (
                        <li> {song.name} </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default App;
