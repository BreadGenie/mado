import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notifications from "./Notifications";
import Options from "./Options";
import VideoPlayer from "./VideoPlayer";

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

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item>
          <VideoPlayer />
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
