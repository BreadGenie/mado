import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "./App";
import { ContextProvider } from "./context/SocketContext";
import "./styles.css";

ReactDOM.render(
  <RecoilRoot>
    <ContextProvider>
      <App />
    </ContextProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
