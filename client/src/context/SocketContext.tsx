import React, { createContext, useRef } from "react";

import { Context } from "../types";

const SocketContext = createContext<Context | null>(null);

const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);

  return (
    <SocketContext.Provider
      value={{
        myVideo,
        userVideo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
