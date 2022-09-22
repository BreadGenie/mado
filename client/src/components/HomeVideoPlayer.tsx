import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideoControls from "./VideoControls";
import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles(() => ({
  video: {
    width: "100%",
    transform: "rotateY(180deg)",
  },
  videoContainer: {
    position: "relative",
    margin: "10px",
  },
  videoControls: {
    position: "absolute",
    bottom: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
  },
}));

const HomeVideoPlayer = () => {
  const classes = useStyles();

  const { myVideo, stream } = useSocketContext();

  return (
    <>
      {stream && (
        <div className={classes.videoContainer}>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
          <div className={classes.videoControls}>
            <VideoControls />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeVideoPlayer;
