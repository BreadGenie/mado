import { useRecoilState } from "recoil";

import { callAtom } from "../atoms";

const useCall = () => {
  const [call, setCall] = useRecoilState(callAtom);

  return { call, setCall };
};

export default useCall;
