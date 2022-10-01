import { useRecoilState } from "recoil";

import { streamAtom } from "../atoms";

const useStream = () => {
  const [stream, setStream] = useRecoilState(streamAtom);

  return { stream, setStream };
};

export default useStream;
