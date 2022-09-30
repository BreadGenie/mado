import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  gridContainer: {
    display: "flex",
    padding: "20px 0px 20px 20px",
    width: "100%",
    flexDirection: "column",
  },
  copyButtonPadding: {
    padding: "0 20px",
  },
  paper: {
    margin: "5px auto",
    padding: "10px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
  },
}));
