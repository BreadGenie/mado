import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container } from "@mui/joy";

import Home from "./components/Home";
import Call from "./components/Call";

import madoTheme from "./madoTheme";
import { useSocketContext } from "./hooks/useSocketContext";

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

  const { callEnded, callAccepted } = useSocketContext();

  return (
    <CssVarsProvider theme={madoTheme}>
      <BrowserRouter>
        <Container className={classes.wrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/call"
              element={
                callAccepted && !callEnded ? (
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
