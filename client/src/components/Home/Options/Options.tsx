import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/joy";
import { ContentCopy, Phone } from "@mui/icons-material";

import { useSocketContext } from "../../../hooks/useSocketContext";
import CopyToClipboard from "react-copy-to-clipboard";

import useStyles from "./styles";

const Options = ({ roomId }: { roomId: string }): JSX.Element => {
  const { serverLoading, name, setName, roomName, joinedRoom, joinRoom } =
    useSocketContext();
  const [roomToJoin, setRoomToJoin] = useState(roomId || roomName);
  const classes = useStyles();

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
        <form className={classes.root} noValidate autoComplete="off">
          <Grid className={classes.gridContainer} container spacing={3}>
            <Grid item>
              <Typography gutterBottom level="h6">
                Name
              </Typography>
              <TextField
                variant="soft"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Typography gutterBottom level="h6">
                Join a Room
              </Typography>
              <TextField
                variant="soft"
                placeholder="ID to call"
                value={roomToJoin}
                onChange={(e) => setRoomToJoin(e.target.value)}
                fullWidth
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
        </form>
      </Paper>
    </>
  );
};

export default Options;
