var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").createServer(app);
var io = require("socket.io")(server);
server.listen(3000);

// Connect client server
io.on('connection', (socket) => {

    // Emit event 'user connected'
    socket.on('user connected', (name) => {
        io.emit('user connected', name);
    })

    // Emit event 'chat message'
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    // Emit event 'user disconnected'
    socket.on('disconnect', () => {
        io.emit('user disconnected', { for: 'everyone' });
    });
})

// create route, display view

app.get("/", function (req, res) {
    res.render("homepage");
});