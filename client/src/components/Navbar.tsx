import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { Typography } from "@mui/joy";

const useStyles = makeStyles(() => ({
  appBar: {
    paddingTop: "5px",
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid lightgrey",
    padding: "10px 50px",
  },
  brand: {
    textDecoration: "none",
  },
}));

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
