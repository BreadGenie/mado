import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

import Options from "./Options/Options";
import Navbar from "../Navbar/Navbar";
import HomeVideoPlayer from "./HomeVideoPlayer/HomeVideoPlayer";
import useStyles from "./styles";
import {
  callEndedAtom,
  isVideoAtom,
  joinedRoomAtom,
  meAtom,
  serverLoadingAtom,
  streamAtom,
} from "../../atoms";
import { useSocketContext } from "../../hooks/useSocketContext";
import { peer, socket } from "../../utils";

const Home = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const { myVideo } = useSocketContext();

  const stream = useRecoilValue(streamAtom);
  const isVideo = useRecoilValue(isVideoAtom);
  const callEnded = useRecoilValue(callEndedAtom);
  const joinedRoom = useRecoilValue(joinedRoomAtom);

  const setMe = useSetRecoilState(meAtom);
  const setStream = useSetRecoilState(streamAtom);
  const setServerLoading = useSetRecoilState(serverLoadingAtom);

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

    socket.on("connection", () => setServerLoading(false));

    peer.on("open", (myId) => setMe(myId));

    peer.on("error", (err) => {
      console.log("Error: ", err);
    });
  }, []);

  useEffect(() => {
    if (myVideo.current) myVideo.current!.srcObject = stream!;
  }, [isVideo]);

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
