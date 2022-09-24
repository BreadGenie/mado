import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@mui/joy";

import VideoControls from "./VideoControls";
import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    height: "100%",
    width: "100%",
    transform: "rotateY(180deg)",
  },
  videoContainer: {
    display: "flex",
    position: "relative",
    margin: "10px",
    height: "50vh",
    width: "35vw",
    [theme.breakpoints.down("md")]: {
      height: "45vh",
      width: "65vw",
    },
  },
  videoControls: {
    position: "absolute",
    bottom: "0%",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  avatar: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#171717",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const HomeVideoPlayer = () => {
  const classes = useStyles();

  const { myVideo, isVideo, stream } = useSocketContext();

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
            <VideoControls />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeVideoPlayer;
