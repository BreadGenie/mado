import { useRecoilState } from "recoil";

import { isAudioAtom } from "../atoms";

const useIsAudio = () => {
  const [isAudio, setIsAudio] = useRecoilState(isAudioAtom);

  return { isAudio, setIsAudio };
};

export default useIsAudio;
