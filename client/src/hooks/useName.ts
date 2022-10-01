import { useRecoilState } from "recoil";

import { nameAtom } from "../atoms";

const useName = () => {
  const [name, setName] = useRecoilState(nameAtom);

  return { name, setName };
};

export default useName;
