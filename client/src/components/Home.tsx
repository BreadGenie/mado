import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Options from "./Options";
import Navbar from "./Navbar";
import HomeVideoPlayer from "./HomeVideoPlayer";
import { useSocketContext } from "../hooks/useSocketContext";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "0 40px",
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
  const { id } = useParams();

  const { joinedRoom, callEnded } = useSocketContext();

  useEffect(() => {
    if (joinedRoom && !callEnded) navigate("/call");
  }, [joinedRoom]);

  return (
    <>
      <Navbar />
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs>
          <HomeVideoPlayer />
        </Grid>
        <Grid item>
          <Options roomId={id || ""} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
