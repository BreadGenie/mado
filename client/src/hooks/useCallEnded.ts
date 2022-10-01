import { useRecoilState } from "recoil";

import { callEndedAtom } from "../atoms";

const useCallEnded = () => {
  const [callEnded, setCallEnded] = useRecoilState(callEndedAtom);

  return { callEnded, setCallEnded };
};

export default useCallEnded;
