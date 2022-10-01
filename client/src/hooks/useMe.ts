import { useRecoilState } from "recoil";
import { meAtom } from "../atoms";

const useMe = () => {
  const [me, setMe] = useRecoilState(meAtom);

  return { me, setMe };
};

export default useMe;
