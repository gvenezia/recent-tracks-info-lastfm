'use strict';

// ============== VARIABLES AND CONFIG ==============
// Assign the required packages to variables
const express = require("express"),   
    path      = require('path'),
    app       = express()
;

// App config
app.set("view engine", "ejs");
app.use( express.static( `${__dirname}/../build` ) );

// ============== ROUTES ==============
// Root Route
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, '..build/index.html'));
});

// ============== LISTENER ==============
// Check that the server is running successfully
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Recent tracks info is running");
});