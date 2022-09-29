import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
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
