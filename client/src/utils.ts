import ColorHash from "color-hash";
import io from "socket.io-client";
import { Peer } from "peerjs";

export const socket = io(
  import.meta.env.VITE_SERVER_URL ?? "http://localhost:5000/"
);

export const peer = new Peer();

export const colorHash = new ColorHash();
