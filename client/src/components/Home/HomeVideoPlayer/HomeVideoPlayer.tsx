import React from "react";
import { Avatar } from "@mui/joy";

import VideoControls from "../../VideoControls/VideoControls";

import useStyles from "./styles";

import { useSocketContext } from "../../../hooks/useSocketContext";
import useCallStates from "../../../hooks/useCallStates";

const HomeVideoPlayer = () => {
  const classes = useStyles();

  const { myVideo } = useSocketContext();

  const { stream, isVideo } = useCallStates();

  return (
    <>
      {stream && (
        <div className={classes.videoContainer}>
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
              className={classes.video}
            />
          )}
          <div className={classes.videoControls}>
            <VideoControls showControls />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeVideoPlayer;
