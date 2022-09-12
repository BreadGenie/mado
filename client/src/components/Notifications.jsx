import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { Call, CallEnd } from "@material-ui/icons";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { call, answerCall, callAccepted, declineCall } =
    useContext(SocketContext);

  return (
    <>
      {call.isRecievedCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{call.name} is calling</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={answerCall}
            startIcon={<Call />}
          >
            Answer
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={declineCall}
            startIcon={<CallEnd />}
          >
            Decline
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
