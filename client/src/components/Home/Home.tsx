import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

import Options from "./Options/Options";
import Navbar from "../Navbar/Navbar";
import HomeVideoPlayer from "./HomeVideoPlayer/HomeVideoPlayer";
import { useSocketContext } from "../../hooks/useSocketContext";
import useStyles from "./styles";

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
