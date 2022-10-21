import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/joy";
import { useSnackbar } from "notistack";

import VideoControls from "../VideoControls/VideoControls";

import useStyles from "./styles";

import { peer, socket } from "../../utils";

import { useSocketContext } from "../../hooks/useSocketContext";

import useCall from "../../hooks/useCall";
import useName from "../../hooks/useName";
import useIsVideo from "../../hooks/useIsVideo";
import useStream from "../../hooks/useStream";
import useCallEnded from "../../hooks/useCallEnded";
import useJoinedRoom from "../../hooks/useJoinedRoom";
import useIsCallerMuted from "../../hooks/useIsCallerMuted";
import VideoOptions from "./VideoOptions";

const Call = (): JSX.Element => {
  const { myVideo, userVideo } = useSocketContext();

  const { call, setCall } = useCall();
  const { callEnded } = useCallEnded();

  const { isCallerMuted } = useIsCallerMuted();
  const { isVideo } = useIsVideo();
  const { stream } = useStream();
  const { joinedRoom } = useJoinedRoom();
  const { name } = useName();

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, [showControls]);

  peer.on("connection", ({ metadata }) => {
    if ("name" in metadata) {
      setCall((prevState) => ({
        ...prevState,
        name: metadata.name,
      }));
      enqueueSnackbar(`${metadata.name} has joined the call`);
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

  useEffect(() => {
    if (myVideo.current) myVideo.current!.srcObject = stream!;
    peer.connect(call.from, { metadata: { isVideo } });
  }, [isVideo]);

  return (
    <div
      className={classes.videoContainer}
      onMouseMove={() => setShowControls(true)}
    >
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
          <div className={classes.videoOptions}>
            <VideoOptions showControls={showControls} />
          </div>
          <video
            playsInline
            muted={isCallerMuted}
            ref={userVideo}
            autoPlay
            className={classes.remoteVideo}
          />
          <div className={classes.videoControls}>
            <VideoControls showControls={showControls} />
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
