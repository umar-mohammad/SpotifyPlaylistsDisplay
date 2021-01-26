import React, { Component, Fragment } from "react";
import queryString from "query-string";
import "./../App.css";
import LoginButton from "./../Components/LoginButton";

import Playlist from "./../Components/Playlist";
import PlaylistCounter from "./../Components/PlaylistCounter";
import HoursCounter from "./../Components/HoursCounter";
import Filter from "./../Components/Filter";

class TopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            top_artists: [],
        };
    }

    fetchUserData(accessToken) {
        if (this.props.user === null) {
            // console.log(`no user data from app yet`);
        } else {
            // console.log(`top page got user data from app`);
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
                    () => console.log(`api called for user data`)
                )
            );
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
        let accessToken = this.props.accessToken || parsed.access_token;
        if (!accessToken) {
            console.log(`trying to access top page but no access token`);
            return;
        }
        this.props.login();
        this.fetchTopArtists(accessToken);
        this.fetchUserData(accessToken);
    }

    render() {
        return (
            <div>
                {this.state.isLogged ? (
                    this.state.user && (
                        <div className="top-page">
                            <h1></h1>
                            <h1
                                style={{
                                    fontSize: "140px",
                                    textAlign: "left",
                                    marginLeft: "2%",
                                    marginTop: "-1px",
                                }}
                            >
                                The artists you listened to the most
                            </h1>
                            {this.state.top_artists.map((artist) => (
                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: "100px",
                                        marginLeft: "50px",
                                    }}
                                >
                                    <img
                                        style={{
                                            padding: "20px",
                                            width: "400px",
                                        }}
                                        src={artist.imageUrl}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            "flex-direction": "column",
                                        }}
                                    >
                                        <h1
                                            className="big-font"
                                            style={{
                                                marginLeft: "-1px",
                                                marginTop: "-0.5%",
                                                fontSize: "120px",
                                            }}
                                        >
                                            {artist.name}
                                        </h1>

                                        <div
                                            style={{
                                                display: "flex",
                                                "flex-direction": "row",
                                                "flex-wrap": "wrap",
                                                alignItems: "center",
                                                padding: "20px",
                                                marginLeft: "-15px",
                                            }}
                                        >
                                            {artist.genres
                                                .slice(0, 1)
                                                .map((genere) => (
                                                    <h2
                                                        style={{
                                                            "margin-top":
                                                                "-150px",
                                                            "margin-right":
                                                                "20px",
                                                            color: "#ff6050",
                                                        }}
                                                    >
                                                        {genere}
                                                    </h2>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default TopPage;
