import React, { useContext, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { IconButton, Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";
import VideoControls from "./VideoControls";
import { VolumeOff, VolumeUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const { name, callEnded, myVideo, userVideo, stream, callAccepted, call } =
    useContext(SocketContext);

  const classes = useStyles();

  const [isCallerMuted, setIsCallerMuted] = useState(false);

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <VideoControls />
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography level="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              muted={isCallerMuted}
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
          <Grid
            container
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <IconButton
              sx={{ margin: "10px" }}
              aria-label="Mute Call"
              variant="solid"
              color={isCallerMuted ? "danger" : "primary"}
              onClick={() =>
                setIsCallerMuted((isCallerMuted) => !isCallerMuted)
              }
            >
              {isCallerMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
