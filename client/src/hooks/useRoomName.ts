import { useRecoilState } from "recoil";

import { roomNameAtom } from "../atoms";

const useRoomName = () => {
  const [roomName, setRoomName] = useRecoilState(roomNameAtom);

  return { roomName, setRoomName };
};

export default useRoomName;
