import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  remoteVideo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#171717",
  },
  videoContainer: {
    position: "fixed",
    left: "0%",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "black",
  },
  videoControls: {
    position: "fixed",
    left: "50%",
    bottom: "10px",
    translate: "-50%",
  },
  paper: {
    padding: "10px",
    border: "2px solid lightgrey",
    borderRadius: "10px",
    margin: "10px",
  },
  myVideoContainer: {
    position: "fixed",
    top: "20px",
    left: "20px",
    height: "20vh",
    width: "25vw",
    boxShadow: "3px 3px 15px -1px rgba(0, 0, 0, 0.77)",
    [theme.breakpoints.up("md")]: {
      width: "15vw",
    },
  },
  myVideo: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "5px",
    border: "2px solid lightgrey",
    transform: "rotateY(180deg)",
  },
  avatar: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#171717",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "5px",
    border: "2px solid lightgrey",
  },
  callerName: {
    position: "fixed",
    left: "5%",
    bottom: "5%",
    maxWidth: "25vw",
  },
  videoOptions: {
    position: "fixed",
    top: "5%",
    right: "5%",
    zIndex: 1,
  },
}));
