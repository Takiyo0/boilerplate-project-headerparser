// server.js
// where your node app starts

// init project
require('dotenv').config();
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set("trust proxy", true)

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get("/api/whoami", (req, res) => {
    const headers = req.headers;
    return res.json({
        ipaddress: (headers["x-forwarded-for"] ? headers["x-forwarded-for"].split(", ")[0] : null) || req.ip || req.socket.remoteAddress || "",
        language: headers["accept-language"],
        software: headers["user-agent"]
    })
})


// listen for requests :)
let listener = app.listen(process.env.PORT || 3080, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
