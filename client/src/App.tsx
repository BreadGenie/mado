import React from "react";
import { AppBar } from "@material-ui/core";
import { Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";

import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

import madoTheme from "./madoTheme";

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

const App = () : JSX.Element => {
  const classes = useStyles();

  return (
    <CssVarsProvider theme={madoTheme}>
      <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography
            startDecorator="窓"
            fontFamily="Sans Serif"
            level="h2"
          >
            Mado
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </div>
    </CssVarsProvider>
  );
};

export default App;
