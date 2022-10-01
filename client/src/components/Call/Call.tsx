import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Avatar, Typography } from "@mui/joy";

import VideoControls from "../VideoControls/VideoControls";
import { useSocketContext } from "../../hooks/useSocketContext";
import useStyles from "./styles";
import {
  callAtom,
  callEndedAtom,
  isCallerMutedAtom,
  isVideoAtom,
  joinedRoomAtom,
  nameAtom,
  streamAtom,
} from "../../atoms";
import { peer, socket } from "../../utils";

const Call = (): JSX.Element => {
  const { myVideo, userVideo } = useSocketContext();

  const [call, setCall] = useRecoilState(callAtom);

  const callEnded = useRecoilValue(callEndedAtom);
  const isCallerMuted = useRecoilValue(isCallerMutedAtom);
  const isVideo = useRecoilValue(isVideoAtom);
  const stream = useRecoilValue(streamAtom);
  const joinedRoom = useRecoilValue(joinedRoomAtom);
  const name = useRecoilValue(nameAtom);

  const classes = useStyles();

  useEffect(() => {
    peer.on("connection", ({ metadata }) => {
      if ("name" in metadata) {
        setCall((prevState) => ({
          ...prevState,
          name: metadata.name,
        }));
      } else if ("isVideo" in metadata) {
        setCall((prevState) => ({
          ...prevState,
          isVideo: metadata.isVideo,
        }));
      }
    });

    socket.on("user-disconnected", () => {
      setCall({
        isRecievedCall: false,
        from: "",
        name: "",
        isVideo: true,
      });
      userVideo.current!.srcObject = null;
    });
  }, []);

  useEffect(() => {
    peer.on("call", (incomingCall) => {
      setCall((prevState) => ({
        ...prevState,
        from: incomingCall.peer,
        isRecievedCall: true,
        name: incomingCall.metadata.name,
      }));

      incomingCall.answer(stream);
      myVideo.current!.srcObject = stream!;

      incomingCall.on("stream", (currentStream) => {
        userVideo.current!.srcObject = currentStream;
        peer.connect(incomingCall.peer, { metadata: { name } });
      });
    });
  }, [name]);

  useEffect(() => {
    if (myVideo.current) myVideo.current!.srcObject = stream!;
    peer.connect(call.from, { metadata: { isVideo } });
  }, [isVideo]);

  return (
    <div className={classes.videoContainer}>
      {joinedRoom && !callEnded && (
        <>
          <Typography
            textColor="white"
            level="h5"
            className={classes.callerName}
            sx={{ zIndex: 2500 }}
          >
            {call.name}
          </Typography>
          {!call.isVideo && (
            <div className={classes.avatar}>
              <Avatar
                style={{ fontSize: "50px" }}
                sx={{
                  "--Avatar-size": "120px",
                }}
              >
                {call.name.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          )}
          <video
            playsInline
            muted={isCallerMuted}
            ref={userVideo}
            autoPlay
            className={classes.remoteVideo}
          />
          <div className={classes.videoControls}>
            <VideoControls />
          </div>
        </>
      )}
      {stream && (
        <div className={classes.myVideoContainer}>
          <div className={classes.avatar}>
            <Avatar
              sx={{
                "--Avatar-size": "80px",
              }}
            />
          </div>
          {isVideo && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.myVideo}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Call;
