import React from "react";
import { Cached } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { InputBase, Paper } from "@mui/material";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

import makeStyles from "./styles";

const TextField = ({
  value,
  placeholder,
  onChange,
  onClick,
}: {
  value: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onClick: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "",
    style: "capital",
  });

  const classes = makeStyles();

  return (
    <Paper variant="outlined" component="form" className={classes.paper}>
      <InputBase
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        style={{ padding: "5px" }}
      />
      <IconButton
        variant="solid"
        color="primary"
        size="sm"
        onClick={() => onClick(randomName)}
      >
        <Cached />
      </IconButton>
    </Paper>
  );
};

export default TextField;
