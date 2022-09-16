import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { Typography } from "@mui/joy";

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
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography startDecorator="窓" fontFamily="Sans Serif" level="h2">
        Mado
      </Typography>
    </AppBar>
  );
};

export default Navbar;
