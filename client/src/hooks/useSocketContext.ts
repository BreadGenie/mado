import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Context } from "../types";

const useSocketContext = (): Context => {
  const context = useContext(SocketContext);
  if (context == null) {
    throw new Error(
      `useSocketContext must be used within SocketContextProvider`
    );
  }
  return context;
};

export { useSocketContext };
