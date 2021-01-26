import React, { Component } from "react";
let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,
};
class Playlist extends Component {
    render() {
        return (
            <div
                style={{
                    ...defaultStyle,
                    width: "25%",
                    textAlign: "center",
                }}
            >
                <img
                    src={this.props.playlist.imageUrl}
                    style={{
                        padding: "20px",
                        width: "300px",
                    }}
                />
                <h2>{this.props.playlist.name}</h2>
                <ul className="playlist-info">
                    {this.props.playlist.songs.slice(0, 3).map((song) => (
                        <li> {song.name} </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Playlist;
