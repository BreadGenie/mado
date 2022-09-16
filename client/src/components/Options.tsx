import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper } from "@material-ui/core";
import { Button, TextField, Typography } from "@mui/joy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone } from "@material-ui/icons";

import { useSocketContext } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginBottom: "20px",
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
  },
}));

const Options = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { me, name, callAccepted, setName, callUser } = useSocketContext();
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={10}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid className={classes.gridContainer} container>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom level="h6">
                Account Info
              </Typography>
              <TextField
                className={classes.margin}
                variant="soft"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button
                  aria-label="Copy to clipboard"
                  variant="solid"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy your account ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
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
    </Container>
  );
};

export default Options;
