import { useRecoilState } from "recoil";
import { serverLoadingAtom } from "../atoms";

const useServerLoading = () => {
  const [serverLoading, setServerLoading] = useRecoilState(serverLoadingAtom);

  return { serverLoading, setServerLoading };
};

export default useServerLoading;
