import React, { useContext } from "react";
import { Grid, Button } from "@material-ui/core";
import { Videocam, VideocamOff, Mic, MicOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const VideoControls = () => {
  const classes = useStyles();

  const { stream, isAudio, setIsAudio, isVideo, setIsVideo, mediaStream } =
    useContext(SocketContext);

  const handleAudio = () => {
    mediaStream.current.getAudioTracks()[0].enabled = !isAudio;
    setIsAudio((prevAudio) => !prevAudio);
  };

  const handleVideo = () => {
    mediaStream.current.getVideoTracks()[0].enabled = !isVideo;
    setIsVideo((prevVideo) => !prevVideo);
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream &&
        (isAudio ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<MicOff />}
            onClick={handleAudio}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Mic />}
            onClick={handleAudio}
          />
        ))}
      {stream &&
        (isVideo ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<VideocamOff />}
            onClick={handleVideo}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Videocam />}
            onClick={handleVideo}
          />
        ))}
    </Grid>
  );
};

export default VideoControls;
