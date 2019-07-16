import React from "react";
import { Link } from "@reach/router";

function NavBar(props) {
    const { uri } = props;

    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">Movie Listings</span>
                <Link to="/" className={uri === "/" ? "mvls-active" : ""}>
                    Movies
                </Link>
                <Link
                    to="/cinemas"
                    className={uri === "/cinemas" ? "mvls-active" : ""}
                >
                    Cinemas
                </Link>
                <Link
                    to="/admin"
                    className={uri === "/admin" ? "mvls-active" : ""}
                >
                    Admin
                </Link>
            </nav>
        </div>
    );
}

export default NavBar;
