import React, { Component } from "react";
let defaultTextColor = "#fff";
let defaultStyle = {
    color: defaultTextColor,
};
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
export default Filter;