import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { IconButton } from "@mui/joy";
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";

import useStyles from "./styles";
import { useSocketContext } from "../../hooks/useSocketContext";
import useCallStates from "../../hooks/useCallStates";

const VideoControls = ({
  showControls,
}: {
  showControls: boolean;
}): JSX.Element => {
  const classes = useStyles();

  const { myVideo } = useSocketContext();

  const {
    stream,
    isAudio,
    setIsAudio,
    isVideo,
    setIsVideo,
    joinedRoom,
    setCallEnded,
    isCallerMuted,
    setIsCallerMuted,
  } = useCallStates();

  useEffect(() => {
    if (myVideo.current) myVideo.current!.srcObject = stream!;
  }, [isVideo]);

  const handleAudio = (): void => {
    stream!.getAudioTracks()[0].enabled = !isAudio;
    setIsAudio((prevAudio) => !prevAudio);
  };

  const handleVideo = (): void => {
    stream!.getVideoTracks()[0].enabled = !isVideo;
    setIsVideo((prevVideo) => !prevVideo);
  };

  const leaveCall = (): void => {
    setCallEnded(true);
    window.location.reload();
  };

  return (
    <>
      {showControls && (
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item>
            <IconButton
              aria-label="Turn video camera on/off"
              variant="solid"
              color={stream && isVideo ? "primary" : "danger"}
              size="lg"
              onClick={handleVideo}
            >
              {stream && isVideo ? <Videocam /> : <VideocamOff />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Turn mic on/off"
              variant="solid"
              color={stream && isAudio ? "primary" : "danger"}
              size="lg"
              onClick={handleAudio}
            >
              {stream && isAudio ? <Mic /> : <MicOff />}
            </IconButton>
          </Grid>
          {joinedRoom && (
            <>
              <Grid item>
                <IconButton
                  aria-label="Mute Call"
                  variant="solid"
                  size="lg"
                  color={isCallerMuted ? "danger" : "primary"}
                  onClick={() =>
                    setIsCallerMuted((isCallerMuted) => !isCallerMuted)
                  }
                >
                  {isCallerMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Hang Up"
                  variant="solid"
                  color="danger"
                  size="lg"
                  onClick={leaveCall}
                >
                  <CallEnd />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default VideoControls;
