import logo from "./../Images/spotify/spotify_logo.svg";
function LoginButton() {
    return (
        <div>
            <button
                className="login-button"
                onClick={() => {
                    window.location = window.location.href.includes("localhost")
                        ? "http://localhost:8888/login"
                        : "https://spotify-display-backend.herokuapp.com/login";
                }}
                style={{
                    display: "inline-block",
                }}
            >
                Sign in with{" "}
                <img className="spotify-logo-image" src={logo} alt="Logo" />
            </button>
        </div>
    );
}

export default LoginButton;
