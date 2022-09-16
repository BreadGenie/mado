import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";

import Home from "./components/Home";
import Call from "./components/Call";

import madoTheme from "./madoTheme";
import { useSocketContext } from "./utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingTop: "5px",
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid lightgrey",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
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
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography startDecorator="窓" fontFamily="Sans Serif" level="h2">
              Mado
            </Typography>
          </AppBar>
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
