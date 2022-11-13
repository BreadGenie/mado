import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/joy";
import { ContentCopy, Phone } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import TextField from "./TextField/TextField";

import useStyles from "./styles";

import { socket, peer } from "../../../utils";

import { useSocketContext } from "../../../hooks/useSocketContext";

import useCallStates from "../../../hooks/useCallStates";

const Options = ({ roomId }: { roomId: string }): JSX.Element => {
  const {
    me,
    name,
    setName,
    stream,
    setCall,
    roomName,
    joinedRoom,
    setJoinedRoom,
  } = useCallStates();

  const { myVideo, userVideo, callRef } = useSocketContext();
  const [roomToJoin, setRoomToJoin] = useState(roomId || roomName);
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const joinRoom = (room: string): void => {
    localStorage.setItem("userName", String(name));
    setJoinedRoom(true);
    navigate(`/call/${roomToJoin}`);
    socket.emit("join-room", room, me);

    socket.on("joined-room", () => {
      myVideo.current!.srcObject = stream!;
    });

    socket.on("user-connected", (id) => {
      const newCall = peer.call(id, stream!, {
        metadata: { name },
      });
      callRef.current = newCall;

      newCall.on("stream", (currentStream) => {
        setCall((prevState) => ({
          ...prevState,
          from: id,
          isRecievedCall: true,
        }));
        userVideo.current!.srcObject = currentStream;
      });
    });
  };

  return (
    <>
      {!me && (
        <Paper className={classes.paper} elevation={10}>
          <Typography gutterBottom level="h6">
            Server Starting...
          </Typography>
        </Paper>
      )}
      <Paper className={classes.paper} elevation={10}>
        <Grid className={classes.gridContainer} container spacing={3}>
          <Grid item>
            <Typography gutterBottom level="h6">
              Name
            </Typography>
            <TextField
              value={name}
              onChange={setName}
              onClick={setName}
              placeholder="Name"
            />
          </Grid>
          <Grid item>
            <Typography gutterBottom level="h6">
              Join a Room
            </Typography>
            <TextField
              placeholder="ID to call"
              value={roomToJoin}
              onChange={setRoomToJoin}
              onClick={setRoomToJoin}
            />
          </Grid>
          <Grid item>
            {!joinedRoom && (
              <LoadingButton
                size="large"
                loadingPosition="start"
                loading={!me}
                aria-label="Join the Room"
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => joinRoom(roomToJoin)}
              >
                Join the Room
              </LoadingButton>
            )}
          </Grid>
          <Grid item>
            <CopyToClipboard
              text={`${window.location.href}${roomId ? "" : roomToJoin}`}
            >
              <LoadingButton
                size="large"
                loadingPosition="start"
                loading={!me}
                color="primary"
                variant="contained"
                aria-label="Copy Room Link"
                startIcon={<ContentCopy fontSize="large" />}
                fullWidth
                onClick={() => enqueueSnackbar("Room Link copied to clipboard")}
              >
                Copy Link
              </LoadingButton>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Options;
