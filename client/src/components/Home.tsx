import React from "react";

import Notifications from "./Notifications";
import Options from "./Options";
import VideoPlayer from "./VideoPlayer";

const Home = (): JSX.Element => {
  return (
    <>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </>
  );
};

export default Home;
