import { useRecoilState } from "recoil";

import { isVideoAtom } from "../atoms";

const useIsVideo = () => {
  const [isVideo, setIsVideo] = useRecoilState(isVideoAtom);

  return { isVideo, setIsVideo };
};

export default useIsVideo;
