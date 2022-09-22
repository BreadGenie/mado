import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { IconButton, Box, Typography } from "@mui/joy";
import { Call, CallEnd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { useSocketContext } from "../hooks/useSocketContext";

const useStyles = makeStyles(() => ({
  box: {
    position: "absolute",
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
    padding: "10px 10px 0",
    textAlign: "center",
  },
}));

const Notifications = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { call, answerCall, callAccepted, declineCall } = useSocketContext();

  const handleAnswerCall = () => {
    answerCall();
    navigate("/call");
  };

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
            <Typography level="h2">{call.name} is calling</Typography>
            <Box sx={{ padding: "10px" }}>
              <IconButton
                style={{ margin: 10 }}
                variant="solid"
                color="primary"
                onClick={handleAnswerCall}
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
