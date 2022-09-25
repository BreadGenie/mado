import React, { createContext, useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { Peer } from "peerjs";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

import { Context, Call } from "../types";

const SocketContext = createContext<Context | null>(null);

const socket = io(process.env.REACT_APP_SERVER_URL ?? "http://localhost:5000/");

const peer = new Peer();

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
  });

  const [joinedRoom, setJoinedRoom] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: " ",
    style: "capital",
  });

  const randomRoomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "",
    style: "capital",
  });

  const [roomName, setRoomName] = useState(randomRoomName);
  const [name, setName] = useState(randomName);

  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isCallerMuted, setIsCallerMuted] = useState(false);

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

    peer.on("open", (myId) => setMe(myId));

    peer.on("call", (incomingCall) => {
      setCall((prevState) => ({
        ...prevState,
        from: incomingCall.peer,
        isRecievedCall: true,
        name: incomingCall.metadata.name,
      }));

      incomingCall.answer(mediaStream.current!);
      myVideo.current!.srcObject = mediaStream.current!;

      incomingCall.on("stream", (currentStream) => {
        userVideo.current!.srcObject = currentStream;
      });
    });

    socket.on("user-disconnected", () => {
      userVideo.current!.srcObject = null;
    });

    peer.on("error", (err) => {
      console.log("Error: ", err);
    });
  }, []);

  useEffect(() => {
    if (myVideo.current) myVideo.current!.srcObject = stream!;
  }, [isVideo]);

  useEffect(() => {
    if (joinedRoom && myVideo.current) myVideo.current!.srcObject = stream!;
  }, [joinedRoom]);

  const joinRoom = (room: string): void => {
    setJoinedRoom(true);

    socket.emit("join-room", room, me);

    socket.on("joined-room", () => {
      myVideo.current!.srcObject = stream!;
    });

    socket.on("user-connected", (id) => {
      const newCall = peer.call(id, stream!, {
        metadata: { name },
      });

      newCall.on("stream", (currentStream) => {
        setCall((prevState) => ({
          ...prevState,
          from: id,
          isRecievedCall: true,
        }));
        userVideo.current!.srcObject = currentStream;
      });
    });
  };

  const leaveCall = (): void => {
    setCallEnded(true);
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        joinedRoom,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        roomName,
        setRoomName,
        callEnded,
        me,
        joinRoom,
        leaveCall,
        isAudio,
        setIsAudio,
        isVideo,
        setIsVideo,
        isCallerMuted,
        setIsCallerMuted,
        mediaStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
