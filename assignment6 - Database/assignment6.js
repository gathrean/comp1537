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

app.get("/userTable", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        // 127.0.0.1
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6"
    });
    let myResults = null;
    connection.connect();
    // this could be from the req.body.user
    let usr = "eanternet";
    let pwd = "HahaPassw0rD!$";
    connection.execute(
        "SELECT * FROM A01167248_user WHERE A01167248_user.user_name = ? AND A01167248_user.password = ?",
        [usr, pwd],
        function (error, results, fields) {
            // results is an array of records, in JSON format
            // fields contains extra meta data about results
            console.log("results:", results);
            //console.log("Results from DB", results, "and the # of records returned", results.length);
            // hmm, what's this?
            myResults = results;
            if (error) {
                // in production, you'd really want to send an email to admin
                // or in the very least, log it. But for now, just console
                console.log(error);
            }
            // let's get the data but output it as an HTML table
            let table = "<table><tr><th>ID</th><th>user_name</th><th>first_name</th><th>last_name</th><th>email_address</th><th>password</th></tr>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr><td>" + results[i].ID + "</td><td>" + results[i].user_name + "</td><td>" + results[i].first_name + "</td><td>" + results[i].last_name + "</td><td>" + results[i].email_address + "</td><td>" + results[i].password + "</td></tr>";
            }
            // don't forget the '+'
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );
});

app.get("/postsTable", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        // 127.0.0.1
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6"
    });
    let myResults = null;
    connection.connect();
    // this could be from the req.body.user
    let usr = "eanternet";
    let pwd = "HahaPassw0rD!$";
    connection.execute(
        "SELECT * FROM A01167248_user_timeline WHERE A01167248_user_timeline.user_name = ? AND A01167248_user_timeline.password = ?",
        [usr, pwd],
        function (error, results, fields) {
            // results is an array of records, in JSON format
            // fields contains extra meta data about results
            console.log("results:", results);
            //console.log("Results from DB", results, "and the # of records returned", results.length);
            // hmm, what's this?
            myResults = results;
            if (error) {
                // in production, you'd really want to send an email to admin
                // or in the very least, log it. But for now, just console
                console.log(error);
            }
            // let's get the data but output it as an HTML table
            let table = "<table><tr><th>TLD</th><th>date_of_post</th><th>text_contents</th><th>text_time</th><th>text_views</th><th>user_id</th></tr>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr><td>" + results[i].TLID + "</td><td>" + results[i].date_of_post 
                       + "</td><td>" + results[i].text_contents + "</td><td>" + results[i].text_time 
                       + "</td><td>" + results[i].text_views + "</td><td>" + results[i].user_id + "</td></tr>";
            }
            // don't forget the '+'
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );
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
let port = 8011;
app.listen(port, function () {
    console.log("Assignment 6 on port " + port + "!");
});
