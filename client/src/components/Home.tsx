import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notifications from "./Notifications";
import Options from "./Options";
import Navbar from "./Navbar";
import HomeVideoPlayer from "./HomeVideoPlayer";
import { useSocketContext } from "../hooks/useSocketContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "0 30px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      padding: "0",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const Home = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { callAccepted, callEnded } = useSocketContext();

  useEffect(() => {
    if (callAccepted && !callEnded) navigate("/call");
  }, [callAccepted]);

  return (
    <>
      <Navbar />
      <Grid container className={classes.gridContainer}>
        <Grid item>
          <HomeVideoPlayer />
        </Grid>
        <Grid item>
          <Options>
            <Notifications />
          </Options>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
