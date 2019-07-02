import React from "react";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import "./App.css";

const MOVIES_SHOWING = [
    {
        id: 2,
        title: "Kalank",
        poster_url: "http://bit.ly/2WnGRdu",
        cinema_count: 2
    },
    {
        id: 1,
        title: "Captain Marvel",
        poster_url: "http://bit.ly/2vI1c1n",
        cinema_count: 1
    },
    {
        id: 4,
        title: "Movie with no name Movie with no name",
        poster_url: "invalid",
        cinema_count: 0
    }
];

function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <NavBar />
            </header>
            <main className="mvls-main">
                <MovieList moviesShowing={MOVIES_SHOWING} />
            </main>
        </div>
    );
}

export default App;
