import React from "react";
import { Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";

import VideoControls from "./VideoControls";
import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles(() => ({
  remoteVideo: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    objectFit: "cover",
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
  myVideo: {
    position: "fixed",
    top: "20px",
    left: "20px",
    height: "170px",
    width: "300px",
    borderRadius: "5px",
    border: "2px solid lightgrey",
    boxShadow: "3px 3px 15px -1px rgba(0, 0, 0, 0.77)",
    objectFit: "cover",
  },
  callerName: {
    position: "fixed",
    left: "5%",
    bottom: "5%",
  },
}));

const VideoPlayer = (): JSX.Element => {
  const {
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
          <Typography level="h5" className={classes.callerName}>
            {call.name || "Name"}
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
        <>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.myVideo}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
