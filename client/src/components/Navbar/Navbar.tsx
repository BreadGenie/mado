import React from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Typography } from "@mui/joy";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link className={classes.brand} to="/">
        <Typography startDecorator="窓" fontFamily="Sans Serif" level="h2">
          Mado
        </Typography>
      </Link>
    </AppBar>
  );
};

export default Navbar;
