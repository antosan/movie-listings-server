const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "movie_listings"
});

app.get("/api/cinemas", (req, res) => {
    // Fetch movies from the database
    pool.query("SELECT id, name FROM cinema", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }

        res.json(rows);
    });
});

app.listen(9000, function() {
    console.log("App listening on port 9000");
});
