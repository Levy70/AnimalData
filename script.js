// Importing necessary modules
const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");

// Setting up middleware
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Handling GET request to "/index"
app.get("/index", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
});

// Serving static files from the current directory
app.use(express.static(__dirname));

// Error handling middleware
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Handling POST request to "/index"
app.post("/index", (req, res) => {
    
    const jsonData = JSON.stringify(req.body, null, 2);
    // Writing JSON string to file
    fs.writeFileSync("data.json", jsonData, (err) => {
        if(err){
            console.log(err);
        }
    });
});