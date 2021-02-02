import React, { Component, Fragment } from "react";
import queryString from "query-string";
import "./../App.css";
import LoginButton from "./../Components/LoginButton";
import CompareButton from "./../Components/CompareButton";

class ComparisonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            top_artists: [],
            comparison_id: "none",
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

    fetchTopArtists(accessToken) {
        if (this.props.artistData === null) {
            // console.log(`no artist data from app yet`);
        } else {
            // console.log(`top page got artist data from app`);
            this.setState({
                top_artists: this.props.artistData,
            });
            return;
        }

        fetch("https://api.spotify.com/v1/me/top/artists", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((response) => response.json())
            .then((artistsData) => {
                let data = artistsData.items.map((artist) => {
                    return {
                        name: artist.name,
                        imageUrl: artist.images[0].url,
                        genres: artist.genres,
                    };
                });

                this.setState({
                    top_artists: data,
                });
                console.log(`api called for artist data`);
                this.props.sendArtistData(data);
            });
    }

    componentDidMount() {
        this.setState({ isLogged: this.props.isLogged });
        let parsed = queryString.parse(window.location.search);
        this.setState({ comparison_id: parsed.comparison_id || `none` });
        let accessToken = this.props.accessToken || parsed.access_token;
        if (!accessToken) {
            console.log(`trying to access top page but no access token`);
            return;
        }
        this.fetchTopArtists(accessToken);
        this.fetchUserData(accessToken);
        // console.log("token from parent " + this.props.accessToken);
        this.fetchPlaylistData(accessToken);
        this.props.sendAccessToken(accessToken);
        this.props.login();
    }

    render() {
        return (
            <div>
                {this.state.isLogged ? (
                    this.state.user && (
                        <div className="comparison-page">
                            <h1></h1>
                            <h1
                                style={{
                                    fontSize: "140px",
                                    textAlign: "center",
                                    marginLeft: "2%",
                                    marginTop: "-1px",
                                }}
                            >
                                Compare your music taste to your friends
                            </h1>
                            {console.log(
                                `comparison_id is ${this.state.comparison_id}`
                            )}
                            <CompareButton
                                comparison_id={this.state.comparison_id}
                            />
                        </div>
                    )
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

export default ComparisonPage;
