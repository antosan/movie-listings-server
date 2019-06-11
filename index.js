require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
