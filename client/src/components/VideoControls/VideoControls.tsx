import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import {
  callEndedAtom,
  isAudioAtom,
  isCallerMutedAtom,
  isVideoAtom,
  joinedRoomAtom,
  streamAtom,
} from "../../atoms";

const VideoControls = (): JSX.Element => {
  const classes = useStyles();

  const { myVideo } = useSocketContext();

  const [isCallerMuted, setIsCallerMuted] = useRecoilState(isCallerMutedAtom);
  const [isAudio, setIsAudio] = useRecoilState(isAudioAtom);
  const [isVideo, setIsVideo] = useRecoilState(isVideoAtom);

  const joinedRoom = useRecoilValue(joinedRoomAtom);
  const stream = useRecoilValue(streamAtom);

  const setCallEnded = useSetRecoilState(callEndedAtom);

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
    <Grid container spacing={2} className={classes.gridContainer}>
      {stream && isVideo ? (
        <Grid item>
          <IconButton
            aria-label="Turn video camera off"
            variant="solid"
            color="primary"
            size="lg"
            onClick={handleVideo}
          >
            <Videocam />
          </IconButton>
        </Grid>
      ) : (
        <Grid item>
          <IconButton
            aria-label="Turn video camera on"
            variant="solid"
            color="danger"
            size="lg"
            onClick={handleVideo}
          >
            <VideocamOff />
          </IconButton>
        </Grid>
      )}
      {stream && isAudio ? (
        <Grid item>
          <IconButton
            aria-label="Turn mic off"
            variant="solid"
            color="primary"
            size="lg"
            onClick={handleAudio}
          >
            <Mic />
          </IconButton>
        </Grid>
      ) : (
        <Grid item>
          <IconButton
            aria-label="Turn mic on"
            variant="solid"
            color="danger"
            size="lg"
            onClick={handleAudio}
          >
            <MicOff />
          </IconButton>
        </Grid>
      )}
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
  );
};

export default VideoControls;
