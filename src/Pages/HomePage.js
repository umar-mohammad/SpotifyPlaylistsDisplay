import Nav from "./../Components/Nav"
function HomePage() {
    return (
        <div>
            <Nav />
            <h1>this is the home page</h1>: (
            {/* <button
                onClick={() => {
                    window.location = window.location.href.includes("localhost")
                        ? "http://localhost:8888/login"
                        : "https://spotify-display-backend.herokuapp.com/login";
                }}
                style={{
                    padding: "10px",
                    "font-size": "50px",
                    "margin-top": "15%",
                }}
            >
                Sign in with Spotify
            </button>
            ) */}
        </div>
    );
}

export default HomePage;
