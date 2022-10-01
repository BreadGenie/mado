import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/joy";
import { ContentCopy, Phone } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";

import TextField from "./TextField/TextField";

import useStyles from "./styles";

import { socket, peer } from "../../../utils";

import { useSocketContext } from "../../../hooks/useSocketContext";

import useMe from "../../../hooks/useMe";
import useCall from "../../../hooks/useCall";
import useName from "../../../hooks/useName";
import useStream from "../../../hooks/useStream";
import useRoomName from "../../../hooks/useRoomName";
import useJoinedRoom from "../../../hooks/useJoinedRoom";
import useServerLoading from "../../../hooks/useServerLoading";

const Options = ({ roomId }: { roomId: string }): JSX.Element => {
  const { joinedRoom, setJoinedRoom } = useJoinedRoom();
  const { name, setName } = useName();
  const { serverLoading } = useServerLoading();
  const { me } = useMe();
  const { stream } = useStream();
  const { roomName } = useRoomName();
  const { setCall } = useCall();

  const { myVideo, userVideo } = useSocketContext();
  const [roomToJoin, setRoomToJoin] = useState(roomId || roomName);
  const classes = useStyles();
  const navigate = useNavigate();

  const joinRoom = (room: string): void => {
    setJoinedRoom(true);
    navigate("/call");
    socket.emit("join-room", room, me);

    socket.on("joined-room", () => {
      myVideo.current!.srcObject = stream!;
    });

    socket.on("user-connected", (id) => {
      const newCall = peer.call(id, stream!, {
        metadata: { name },
      });

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
      {serverLoading && (
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
                loading={serverLoading}
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
                loading={serverLoading}
                color="primary"
                variant="contained"
                aria-label="Copy Room Link"
                startIcon={<ContentCopy fontSize="large" />}
                fullWidth
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
