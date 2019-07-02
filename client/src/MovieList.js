import React from "react";
import Movie from "./Movie";

function MovieList({ moviesShowing }) {
    return (
        <div className="mvls-container">
            <div className="mvls-movie-list">
                {moviesShowing.map(m => (
                    <Movie key={m.id} movieShowing={m} />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
