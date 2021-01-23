import React, { Component } from "react";
let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,
};

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

export default HoursCounter;
