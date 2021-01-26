import logo from "./../Images/spotify/spotify_logo.svg";
function HomePage() {
    return (
        <div className="home-page">
            <h1 className="big-font">
                Want to learn more about your music taste?{" "}
            </h1>
            <button
                className="login-button"
                onClick={() => {
                    window.location = window.location.href.includes("localhost")
                        ? "http://localhost:8888/login"
                        : "https://spotify-display-backend.herokuapp.com/login";
                }}
            >
                Sign in with{" "}
                <img className="spotify-logo-image" src={logo} alt="Logo" />
            </button>
        </div>
    );
}

export default HomePage;
