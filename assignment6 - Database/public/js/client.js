// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
        //console.log(currentElement, currentIndex, listObj);
        currentElement.addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                        this.parentNode.childNodes[i].innerHTML = "";
                        break;
                    }
                }
            }

        });
    });

    // For info JSON
    document.querySelector("#infoJSON").addEventListener("click", function (e) {
        let something = null;
        ajaxGET("/info?format=json", function (data) {
            console.log("Before parsing", data);
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            something = parsedData;
            console.log("what is something in the AJAX call?", something);
            console.log("Before parsing", parsedData);
            let str = "<ol>"
            for (let i = 0; i < parsedData.length; i++) {
                str += "<li>" + parsedData[i] + "</li>";
            }
            str += "</ol>";
            document.getElementById("info-json").innerHTML = str;
        });
        console.log("what is something?", something);
    });

    // For info HTML
    document.querySelector("#infoHTML").addEventListener("click", function (e) {
        ajaxGET("/info?format=html", function (data) {
            console.log(data);
            // since it's HTML, let's drop it right in
            document.getElementById("info-html").innerHTML = data;
        });
    });

    ajaxGET("/userTable", function (data) {
        console.log(data);
        document.getElementById("userTable").innerHTML = data;
    });

    ajaxGET("/postsTable", function (data) {
        console.log(data);
        document.getElementById("postsTable").innerHTML = data;
    });

    function x(e) {
        ajaxGET("/table?format=html", function (data) {
            console.log(data);
            // since it's HTML, let's drop it right in
            document.getElementById("table").innerHTML = data;
        });
    };
    x();

});

// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}

