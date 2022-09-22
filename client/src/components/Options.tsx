import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Button, TextField, Typography } from "@mui/joy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone } from "@material-ui/icons";

import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    flexDirection: "column",
  },
  margin: {
    marginBottom: "20px",
  },
  padding: {
    padding: 20,
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

const Options = ({
  children,
  callerId,
}: {
  children: React.ReactNode;
  callerId: string;
}): JSX.Element => {
  const { me, name, callAccepted, setName, callUser } = useSocketContext();
  const [idToCall, setIdToCall] = useState(callerId);
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={10}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid className={classes.gridContainer} container>
          <Grid item className={classes.padding}>
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
            <CopyToClipboard text={`${window.location.href}${me}`}>
              <Button
                aria-label="Copy call link to clipboard"
                variant="solid"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}
              >
                Copy Call Link
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item className={classes.copyButtonPadding}>
            <CopyToClipboard text={me}>
              <Button
                aria-label="Copy account ID to clipboard"
                variant="solid"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}
              >
                Copy Account ID
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item className={classes.padding}>
            <Typography gutterBottom level="h6">
              Make a Call
            </Typography>
            <TextField
              className={classes.margin}
              variant="soft"
              placeholder="ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
            />
            {!callAccepted && (
              <Button
                aria-label="Call a user"
                variant="solid"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => callUser(idToCall)}
                className={classes.margin}
              >
                Call
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      {children}
    </Paper>
  );
};

export default Options;
