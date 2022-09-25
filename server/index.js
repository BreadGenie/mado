const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("server is running");
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.emit("joined-room");
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected");
    });
  });
});

server.listen(port, function () {
  console.log("Server is listening on port " + port);
});
