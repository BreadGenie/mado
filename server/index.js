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
  const me = socket.id;
  socket.emit("me", me);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended", me);
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", ({ signal, to, receiverName }) => {
    io.to(to).emit("callaccepted", { signal, receiverName });
  });

  socket.on("declinecall", (data) => {
    io.to(data.to).emit("declinecall");
  });

  socket.on("callended", (data) => {
    io.to(data.to).emit("callended", me);
  });
});

server.listen(port, function () {
  console.log("Server is listening on port " + port);
});
