import { useContext } from "react";
import { SocketContext } from "./SocketContext";
import { Context } from "./types";

const useSocketContext = (): Context => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      `useSocketContext must be used within SocketContextProvider`
    );
  }
  return context;
};

export { useSocketContext };
