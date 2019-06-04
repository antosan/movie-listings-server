const express = require("express");
const app = express();

app.get("/", (req, res) => {
    // Logic
    res.json({ message: "Hello world" });
});

app.listen(9000, function() {
    console.log("App listening on port 9000");
});
