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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/cinemas", (req, res) => {
    // Fetch movies from the database
    pool.query("SELECT id, name FROM cinema", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }

        res.json(rows);
    });
});

app.get("/api/cinemas/:id", (req, res) => {
    pool.query(
        "SELECT id, name FROM cinema WHERE id = ?",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});

app.post("/api/cinemas", (req, res) => {
    const { name } = req.body;

    if (name === "") {
        return res.status(400).json({ error: "Invalid payload" });
    }

    // Insert name to the database
    pool.query(
        "INSERT INTO cinema (name) VALUES (?)",
        [name],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.insertId);
        }
    );
});

app.put("/api/cinemas/:id", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    // Update the cinema in the database
    pool.query(
        "UPDATE cinema SET name = ? WHERE id = ?",
        [name, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }
    );
});

app.delete("/api/cinemas/:id", (req, res) => {
    pool.query(
        "DELETE FROM cinema WHERE id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.affectedRows);
        }
    );
});

app.listen(9000, function() {
    console.log("App listening on port 9000");
});
