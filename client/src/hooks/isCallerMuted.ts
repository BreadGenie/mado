import { useRecoilState } from "recoil";

import { isCallerMutedAtom } from "../atoms";

const useIsCallerMuted = () => {
  const [isCallerMuted, setIsCallerMuted] = useRecoilState(isCallerMutedAtom);

  return { isCallerMuted, setIsCallerMuted };
};

export default useIsCallerMuted;
