import React, { createContext, useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Context, Call } from "./types";

const SocketContext = createContext<Context | null>(null);

const socket = io(process.env.REACT_APP_SERVER_URL ?? "http://localhost:5000/");

const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState("");
  const [call, setCall] = useState<Call>({
    isRecievedCall: false,
    from: "",
    name: "",
    signal: "",
  });
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);

  const mediaStream = useRef<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        mediaStream.current = currentStream;
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) =>
      setCall({
        isRecievedCall: true,
        from,
        name: callerName,
        signal,
      })
    );

    socket.on("callended", () => window.location.reload());
  }, []);

  useEffect(() => {
    if (callAccepted) myVideo.current!.srcObject = stream!;
  }, [callAccepted]);

  const answerCall = (): void => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", {
        signal: data,
        to: call.from,
        receiverName: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    peer.signal(call.signal);
  };

  const declineCall = (): void => {
    socket.emit("declinecall", { to: call.from });
    setCall({ isRecievedCall: false, from: "", name: "", signal: "" });
  };

  const callUser = (id: string): void => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    socket.on("callaccepted", ({ signal, receiverName }) => {
      setCall((prevState) => ({ ...prevState, name: receiverName }));
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const leaveCall = (): void => {
    setCallEnded(true);
    socket.emit("callended", { to: call.from });
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        answerCall,
        declineCall,
        leaveCall,
        isAudio,
        setIsAudio,
        isVideo,
        setIsVideo,
        mediaStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
