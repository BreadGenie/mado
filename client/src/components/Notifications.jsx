import React, { useContext } from "react";
import { Button, Modal, Box } from "@material-ui/core";
import { Call, CallEnd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#ffffff99",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  buttonContainer: {
    padding: "10px",
  },
}));

const Notifications = () => {
  const classes = useStyles();

  const { call, answerCall, callAccepted, declineCall } =
    useContext(SocketContext);

  return (
    <>
      {call.isRecievedCall && !callAccepted && (
        <Modal
          open={call.isRecievedCall && !callAccepted}
          onClose={declineCall}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.box}>
            <h1>{call.name} is calling</h1>
            <Box className={classes.buttonContainer}>
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={answerCall}
                startIcon={<Call />}
              />
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="secondary"
                onClick={declineCall}
                startIcon={<CallEnd />}
              />
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Notifications;
