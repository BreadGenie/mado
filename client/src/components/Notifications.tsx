import React from "react";
import { Modal } from "@material-ui/core";
import { IconButton, Box } from "@mui/joy";
import { Call, CallEnd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { useSocketContext } from "../utils";

const useStyles = makeStyles(() => ({
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#ffffff99",
    border: "2px solid grey",
    borderRadius: "10px",
    boxShadow: "24",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const Notifications = (): JSX.Element => {
  const classes = useStyles();

  const { call, answerCall, callAccepted, declineCall } = useSocketContext();

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
            <Box sx={{ padding: "10px" }}>
              <IconButton
                style={{ margin: 10 }}
                variant="solid"
                color="primary"
                onClick={answerCall}
              >
                <Call />
              </IconButton>
              <IconButton
                style={{ margin: 10 }}
                variant="solid"
                color="danger"
                onClick={declineCall}
              >
                <CallEnd />
              </IconButton>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Notifications;
