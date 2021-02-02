import React, { Component, Fragment } from "react";

class CompareButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.comparison_id}</h1>
                <button
                    className="login-button"
                    onClick={() => {
                        //code to send data to the database
                        //make this block of code get data from the right place
                        // window.location = window.location.href.includes("localhost")
                        //     ? "http://localhost:8888/login"
                        //     : "https://spotify-display-backend.herokuapp.com/login";

                        
                    }}
                    style={{
                        display: "inline-block",
                    }}
                >
                    Compare
                </button>
            </div>
        );
    }
}

export default CompareButton;
