import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/joy";
import { ContentCopy, Phone } from "@mui/icons-material";

import { useSocketContext } from "../hooks/useSocketContext";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    padding: "20px",
    width: "100%",
    flexDirection: "column",
  },
  margin: {
    marginBottom: "20px",
  },
  copyButtonPadding: {
    padding: "0 20px",
  },
  paper: {
    margin: "35px auto",
    padding: "10px 20px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
  },
}));

const Options = ({ roomId }: { roomId: string }): JSX.Element => {
  const { serverLoading, name, setName, roomName, joinedRoom, joinRoom } =
    useSocketContext();
  const [roomToJoin, setRoomToJoin] = useState(roomId || roomName);
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={10}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid className={classes.gridContainer} container spacing={3}>
          <Grid item>
            <Typography gutterBottom level="h6">
              Name
            </Typography>
            <TextField
              className={classes.margin}
              variant="soft"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
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
          <Grid item>
            <Typography gutterBottom level="h6">
              Join a Room
            </Typography>
            <TextField
              className={classes.margin}
              variant="soft"
              placeholder="ID to call"
              value={roomToJoin}
              onChange={(e) => setRoomToJoin(e.target.value)}
              fullWidth
            />
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
                className={classes.margin}
              >
                Join the Room
              </LoadingButton>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Options;
