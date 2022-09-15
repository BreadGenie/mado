import React from "react";
import { Grid } from "@material-ui/core";
import { IconButton } from "@mui/joy";
import { Videocam, VideocamOff, Mic, MicOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { useSocketContext } from "../utils";

const useStyles = makeStyles(() => ({
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}));

const VideoControls = (): JSX.Element => {
  const classes = useStyles();

  const { stream, isAudio, setIsAudio, isVideo, setIsVideo, mediaStream } =
    useSocketContext();

  const handleAudio = (): void => {
    mediaStream.current!.getAudioTracks()[0].enabled = !isAudio;
    setIsAudio((prevAudio) => !prevAudio);
  };

  const handleVideo = (): void => {
    mediaStream.current!.getVideoTracks()[0].enabled = !isVideo;
    setIsVideo((prevVideo) => !prevVideo);
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream &&
        (isVideo ? (
          <IconButton
            sx={{ marginRight: "5px" }}
            aria-label="Turn video camera off"
            variant="solid"
            color="primary"
            onClick={handleVideo}
          >
            <Videocam />
          </IconButton>
        ) : (
          <IconButton
            sx={{ marginRight: "5px" }}
            aria-label="Turn video camera oon"
            variant="solid"
            color="danger"
            onClick={handleVideo}
          >
            <VideocamOff />
          </IconButton>
        ))}
      {stream &&
        (isAudio ? (
          <IconButton
            sx={{ marginLeft: "5px" }}
            aria-label="Turn mic off"
            variant="solid"
            color="primary"
            onClick={handleAudio}
          >
            <Mic />
          </IconButton>
        ) : (
          <IconButton
            sx={{ marginLeft: "5px" }}
            aria-label="Turn mic on"
            variant="solid"
            color="danger"
            onClick={handleAudio}
          >
            <MicOff />
          </IconButton>
        ))}
    </Grid>
  );
};

export default VideoControls;
