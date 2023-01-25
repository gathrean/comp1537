// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use(express.static(__dirname + '/app'));

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/images", express.static("./app/html/images"));

app.get("/", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/markers", function (req, res) {

    let doc = fs.readFileSync("./app/data/google-map-markers.js", "utf8");
    res.setHeader("Content-Type", "application/json");
    // just send the text stream
    res.send(doc);

});

/*
 * This one accepts a query string
 */
app.get("/table", function (req, res) {

    let formatOfResponse = req.query["format"];

    // e.g.,: http://localhost:8000/weekdays?format=html
    // e.g.,: http://localhost:8000/weekdays?format=json
    if (formatOfResponse == "html") {
        // MIME type
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/table.html", "utf8"));

    } else if (formatOfResponse == "json") {
        // MIME type
        res.setHeader("Content-Type", "application/json");
        res.send(fs.readFileSync("./app/data/table.js", "utf8"));

    } else {
        // just send JSON message
        res.send({ status: "fail", msg: "Wrong format!" });
    }
});

// NEW
app.get("/info", function (req, res) {

    let formatOfResponse = req.query["format"];

    // e.g.,: http://localhost:8000/info2?format=html
    // e.g.,: http://localhost:8000/info1?format=json
    if (formatOfResponse == "html") {
        // MIME type
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/info.html", "utf8"));

    } else if (formatOfResponse == "json") {
        // MIME type
        res.setHeader("Content-Type", "application/json");
        res.send(fs.readFileSync("./app/data/info.js", "utf8"));

    } else {
        // just send JSON message
        res.send({ status: "fail", msg: "Wrong format!" });
    }
});

// app.get("/hello", function (req, res) {
//     // just send some plain text
//     res.send("Hello world!");
// });

// app.get("/helloHTML", function (req, res) {
//     // hard-coded HTML
//     res.send("<html><head><title>Hi!</head><body><p>Hello!</p></body></html>");
// });

// app.get("/profile", function (req, res) {

//     let doc = fs.readFileSync("./app/html/profile.html", "utf8");

//     // just send the text stream
//     res.send(doc);

// });


// app.get("/date", function (req, res) {

//     // set the type of response:
//     res.setHeader("Content-Type", "application/json");
//     let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
//     let d = new Date();

//     res.send({ currentTime: d.toLocaleDateString("en-US", options) });

// });

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Assignment 5 on port " + port + "!");
});
