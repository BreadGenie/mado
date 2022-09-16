import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";

import Home from "./components/Home";
import Call from "./components/Call";

import madoTheme from "./madoTheme";
import { useSocketContext } from "./utils";
import Navbar from "./components/Navbar";

const useStyles = makeStyles(() => ({
  image: {
    marginLeft: "15px",
  },
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
        <div className={classes.wrapper}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/join"
              element={
                callAccepted && !callEnded ? (
                  <Call />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </CssVarsProvider>
  );
};

export default App;
