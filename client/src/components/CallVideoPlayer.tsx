import React from "react";
import { Avatar, Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";

import VideoControls from "./VideoControls";
import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles(() => ({
  remoteVideo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#171717",
  },
  videoContainer: {
    position: "fixed",
    left: "0%",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "black",
  },
  videoControls: {
    position: "fixed",
    left: "50%",
    bottom: "10px",
    translate: "-50%",
  },
  paper: {
    padding: "10px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
    margin: "10px",
  },
  myVideoContainer: {
    position: "fixed",
    top: "20px",
    left: "20px",
    height: "170px",
    width: "300px",
    boxShadow: "3px 3px 15px -1px rgba(0, 0, 0, 0.77)",
  },
  myVideo: {
    height: "170px",
    width: "300px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "2px solid lightgrey",
    transform: "rotateY(180deg)",
  },
  avatar: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#171717",
    height: "100%",
    width: "300px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "5px",
    border: "2px solid lightgrey",
  },
  callerName: {
    position: "fixed",
    left: "5%",
    bottom: "5%",
    maxWidth: "25vw",
  },
}));

const VideoPlayer = (): JSX.Element => {
  const {
    isVideo,
    callEnded,
    myVideo,
    userVideo,
    stream,
    callAccepted,
    call,
    isCallerMuted,
  } = useSocketContext();

  const classes = useStyles();

  return (
    <div className={classes.videoContainer}>
      {callAccepted && !callEnded && (
        <>
          <Typography
            textColor="white"
            level="h5"
            className={classes.callerName}
          >
            {call.name}
          </Typography>
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

export default VideoPlayer;
