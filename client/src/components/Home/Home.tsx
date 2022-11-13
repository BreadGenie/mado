import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Options from "./Options/Options";
import Navbar from "../Navbar/Navbar";
import HomeVideoPlayer from "./HomeVideoPlayer/HomeVideoPlayer";

import useStyles from "./styles";

import { peer, socket } from "../../utils";

import { useSocketContext } from "../../hooks/useSocketContext";
import useCallStates from "../../hooks/useCallStates";

const Home = (): JSX.Element => {
  const classes = useStyles();
  const { id } = useParams();

  const { myVideo } = useSocketContext();

  const { setMe, setStream } = useCallStates();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  peer.on("open", (myId) => setMe(myId));

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
