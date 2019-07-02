import React from "react";
import Movie from "./Movie";

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesShowing: []
        };
    }

    render() {
        return (
            <div className="mvls-container">
                <div className="mvls-movie-list">
                    {this.state.moviesShowing.map(m => (
                        <Movie key={m.id} movieShowing={m} />
                    ))}
                </div>
            </div>
        );
    }
}

export default MovieList;
