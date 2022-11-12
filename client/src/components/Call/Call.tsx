import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/joy";
import { useSnackbar } from "notistack";

import VideoControls from "../VideoControls/VideoControls";

import useStyles from "./styles";

import { colorHash, peer, socket } from "../../utils";

import { useSocketContext } from "../../hooks/useSocketContext";

import useCallStates from "../../hooks/useCallStates";
import VideoOptions from "./VideoOptions";

const Call = (): JSX.Element => {
  const { myVideo, userVideo, callRef } = useSocketContext();

  const {
    call,
    name,
    stream,
    isVideo,
    setCall,
    callEnded,
    isCallerMuted,
    joinedRoom,
  } = useCallStates();

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [showControls, setShowControls] = useState(true);
  const [optionsOpened, setOptionsOpened] = useState(false);

  useEffect(() => {
    const controlHideTimer = setTimeout(() => {
      if (showControls && !optionsOpened) setShowControls(false);
    }, 3000);

    return () => clearTimeout(controlHideTimer);
  }, [showControls, optionsOpened]);

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
    setCall((prevState) => {
      if (prevState.name)
        enqueueSnackbar(`${prevState.name} has left the call`);
      callRef.current = null;

      return {
        isRecievedCall: false,
        from: "",
        name: "",
        isVideo: true,
      };
    });
    userVideo.current!.srcObject = null;
  });

  peer.on("call", (incomingCall) => {
    callRef.current = incomingCall;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                variant="solid"
                style={{ fontSize: "50px", paddingTop: "15px" }}
                sx={{
                  "--Avatar-size": "120px",
                  backgroundColor: colorHash.hex(call.from),
                }}
              >
                {call.name.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          )}
          <div className={classes.videoOptions}>
            <VideoOptions
              showControls={showControls}
              setOptionsOpened={setOptionsOpened}
            />
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
