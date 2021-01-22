import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
let defaultTextColor = "#fff";

let defaultStyle = {
    color: defaultTextColor,
};

let fakeServerData = {
    user: {
        name: "David",
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
            return sum + song.duration;
        }, 0);
        return (
            <div
                style={{
                    ...defaultStyle,
                    width: "40%",
                    display: "inline-block",
                }}
            >
                <h2 style={{ color: "#fff" }}>
                    {Math.floor(totalDuration / 60)} Hours
                </h2>
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <div style={defaultStyle}>
                <img />
                <input type="text" />
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
                <img />
                <h3>{this.props.playlist.name}</h3>
                <ul>
                    {this.props.playlist.songs.map((song) => (
                        <li> {song.name} </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = { serverData: {} };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ serverData: fakeServerData });
        }, 1000);
    }
    render() {
        return (
            <div className="App">
                {this.state.serverData.user ? (
                    <div>
                        <h1>{this.state.serverData.user.name}'s playlists</h1>
                        <PlaylistCounter
                            playlists={this.state.serverData.user.playlists}
                        />
                        <HoursCounter
                            playlists={this.state.serverData.user.playlists}
                        />
                        <Filter />
                        {this.state.serverData.user.playlists.map(
                            (playlist) => (
                                <Playlist playlist={playlist} />
                            )
                        )}
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }
}

export default App;
