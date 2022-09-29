import React from "react";
import { Avatar, Typography } from "@mui/joy";

import VideoControls from "../VideoControls/VideoControls";
import { useSocketContext } from "../../hooks/useSocketContext";
import useStyles from "./styles";

const Call = (): JSX.Element => {
  const {
    isVideo,
    callEnded,
    myVideo,
    userVideo,
    stream,
    joinedRoom,
    call,
    isCallerMuted,
  } = useSocketContext();

  const classes = useStyles();

  return (
    <div className={classes.videoContainer}>
      {joinedRoom && !callEnded && (
        <>
          <Typography
            textColor="white"
            level="h5"
            className={classes.callerName}
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
