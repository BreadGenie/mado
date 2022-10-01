import React from "react";
import { useRecoilValue } from "recoil";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container } from "@mui/joy";

import Home from "./components/Home/Home";
import Call from "./components/Call/Call";

import madoTheme from "./madoTheme";
import { callEndedAtom, joinedRoomAtom } from "./atoms";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();

  const callEnded = useRecoilValue(callEndedAtom);
  const joinedRoom = useRecoilValue(joinedRoomAtom);

  return (
    <CssVarsProvider theme={madoTheme}>
      <BrowserRouter>
        <Container className={classes.wrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route
              path="/call"
              element={
                joinedRoom && !callEnded ? (
                  <Call />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </CssVarsProvider>
  );
};

export default App;
