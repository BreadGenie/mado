import React, { createContext, useRef } from "react";
import { MediaConnection } from "peerjs";

import { Context } from "../types";

const SocketContext = createContext<Context | null>(null);

const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);

  const callRef = useRef<MediaConnection | null>(null);

  return (
    <SocketContext.Provider
      value={{
        myVideo,
        userVideo,
        callRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
