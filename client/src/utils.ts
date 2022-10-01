import io from "socket.io-client";
import { Peer } from "peerjs";

export const socket = io(
  process.env.REACT_APP_SERVER_URL ?? "http://localhost:5000/"
);

export const peer = new Peer();
