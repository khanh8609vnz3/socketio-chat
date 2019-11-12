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

    // Send message welcome to user connect
    // io.emit('welcome');

    // Emit event 'user connected'
    socket.on('user connected', (name) => {
        io.emit('user connected', name);
    })

    // Emit event 'chat message'
    socket.on('chat message', (msg, name) => {
        socket.broadcast.emit('chat message', msg, name); // send message to all except the user
        // io.emit('chat message', msg, name);
    });

    // Emit event 'user disconnected'
    socket.on('disconnect', () => {
        io.emit('user disconnected');
    });

    // Emit event 'user typing'
    socket.on('user typing', (name, isTyping) => {
        socket.broadcast.emit('user typing', name, isTyping);
    })
})

// create route, display view

app.get("/", function (req, res) {
    res.render("homepage");
});