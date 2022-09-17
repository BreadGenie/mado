import React from "react";
import { Paper } from "@material-ui/core";
import { Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";

import VideoControls from "./VideoControls";
import { useSocketContext } from "../utils";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "600px",
    [theme.breakpoints.down("md")]: {
      width: "450px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
    margin: "10px",
  },
  gridContainer: {},
}));

const HomeVideoPlayer = () => {
  const classes = useStyles();

  const { name, myVideo, stream } = useSocketContext();

  return (
    <>
      {stream && (
        <Paper className={classes.paper}>
          <Typography level="h5" gutterBottom>
            {name || "Name"}
          </Typography>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
          <VideoControls />
        </Paper>
      )}
    </>
  );
};

export default HomeVideoPlayer;
