import React, { Component, Fragment } from "react";
import queryString from "query-string";
import "./../App.css";
import Playlist from "./../Components/Playlist";
import PlaylistCounter from "./../Components/PlaylistCounter";
import HoursCounter from "./../Components/HoursCounter";
import Filter from "./../Components/Filter";
import LoginButton from "./../Components/LoginButton";

class PlaylistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterString: "",
        };
    }

    fetchUserData(accessToken) {
        if (this.props.user === null) {
            // console.log(`no user data from app yet`);
        } else {
            // console.log(`playlist page user data from app`);
            this.setState({
                user: {
                    name: this.props.user.name,
                },
            });
            return;
        }

        fetch("https://api.spotify.com/v1/me", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
            .then((data) =>
                this.setState(
                    {
                        user: {
                            name: data.display_name,
                        },
                    },
                    () => {
                        this.props.sendUserData(data.display_name);
                        console.log(`api called for user data`);
                    }
                )
            );
    }

    fetchPlaylistData(accessToken) {
        let playlists = this.props.playlists;
        if (playlists === null) {
            // console.log(`no playlist data from app yet`);
        } else {
            // console.log(`playlist page user data from app ${playlists}`);
            this.setState({
                playlists: playlists,
            });
            return;
        }

        fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
            .then((playlistData) => {
                let playlists = playlistData.items;
                let trackDataPromises = playlists.map((playlist) => {
                    //take each playlist and fetch its tracks
                    let trackPromise = fetch(playlist.tracks.href, {
                        headers: { Authorization: "Bearer " + accessToken },
                    });
                    //transform the array of response objects to array into json objects we can use
                    let tracksPromiseData = trackPromise.then((response) =>
                        response.json()
                    );
                    // .then((result) => console.log(result));
                    return tracksPromiseData;
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
            .then((playlists) => {
                let data = playlists.map((playlist) => {
                    return {
                        name: playlist.name,
                        imageUrl: playlist.images[0].url,
                        songs: playlist.tracks,
                    };
                });

                this.setState({
                    playlists: data,
                });
                this.props.sendPlaylistData(data);
                console.log(`api called for playlist data`);
                // console.log(data);
            });
    }

    componentDidMount() {
        // console.log("token from parent " + this.props.accessToken);
        let parsed = queryString.parse(window.location.search);
        let accessToken = this.props.accessToken || parsed.access_token;
        if (!accessToken) return;
        this.fetchUserData(accessToken);
        this.fetchPlaylistData(accessToken);
        this.props.sendAccessToken(accessToken);
        this.props.login();
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
                    <Fragment>
                        <h1 className="big-font">
                            Let's get you signed in first
                        </h1>
                        <LoginButton />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default PlaylistPage;
