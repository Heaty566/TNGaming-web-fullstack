import React from "react";
import "./App.css";
import Logo from "./logo";

function App() {
    return (
        <div className="App">
            <div className="background"></div>
            <img src={process.env.PUBLIC_URL + "/background.jpg"} alt="background" className="background-image" />
            <div className="main-content">
                <Logo />
                <h1>We are still building ....</h1>
            </div>
        </div>
    );
}

export default App;
