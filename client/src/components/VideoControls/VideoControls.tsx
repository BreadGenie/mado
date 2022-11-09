import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Grid } from "@material-ui/core";
import { IconButton } from "@mui/joy";
import {
  Mic,
  MicOff,
  CallEnd,
  VolumeUp,
  Videocam,
  VolumeOff,
  VideocamOff,
  PresentToAll,
  CancelPresentation,
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

  const [isScreenShare, setIsScreenShare] = useState(false);

  const { callRef } = useSocketContext();

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

  const shareScreen = () => {
    setIsScreenShare((isScreenShare) => {
      if (!isScreenShare && callRef.current)
        navigator.mediaDevices.getDisplayMedia().then((screenCapture) => {
          // replace stream with screen capture
          const videoTrack = screenCapture.getVideoTracks()[0];
          const sender = callRef
            .current!.peerConnection.getSenders()
            .find((s) => s.track!.kind === videoTrack.kind);
          sender?.replaceTrack(videoTrack);
        });
      else if (isScreenShare) {
        // replace screen capture with stream
        const videoTrack = stream!.getVideoTracks()[0];
        const sender = callRef
          .current!.peerConnection.getSenders()
          .find((s) => s.track!.kind === videoTrack.kind);
        sender?.replaceTrack(videoTrack);
      }
      return !isScreenShare;
    });
  };

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
              {!isMobile && (
                <Grid item>
                  <IconButton
                    aria-label="Share Screen"
                    variant="solid"
                    size="lg"
                    color={isScreenShare ? "danger" : "primary"}
                    onClick={shareScreen}
                  >
                    {isScreenShare ? <CancelPresentation /> : <PresentToAll />}
                  </IconButton>
                </Grid>
              )}
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
