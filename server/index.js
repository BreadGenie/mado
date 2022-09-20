const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());

const port = process.env.PORT || 5000;

const peerPair = {};

app.get("/", function (req, res) {
  res.send("server is running");
});

io.on("connection", (socket) => {
  const me = socket.id;
  socket.emit("me", me);

  socket.on("disconnect", () => {
    const callerId = peerPair[me];

    io.to(callerId).emit("callended");

    delete peerPair[me];
    delete peerPair[callerId];
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    peerPair[me] = userToCall;
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", ({ signal, to, receiverName }) => {
    peerPair[me] = to;
    io.to(to).emit("callaccepted", { signal, receiverName });
  });

  socket.on("declinecall", (data) => {
    io.to(data.to).emit("declinecall");
  });

  socket.on("callended", (data) => {
    io.to(data.to).emit("callended");
  });
});

server.listen(port, function () {
  console.log("Server is listening on port " + port);
});
