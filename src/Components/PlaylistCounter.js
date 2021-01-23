import React, { Component } from "react";
let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,
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
export default PlaylistCounter;
