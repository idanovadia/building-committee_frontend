//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/building-committee-frontend'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname,'/dist/building-committee-frontend/index.html'));
console.log(path.join(__dirname,'/dist/building-committee-frontend/index.html'));
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
  });