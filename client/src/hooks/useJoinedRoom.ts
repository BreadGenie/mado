import { useRecoilState } from "recoil";

import { joinedRoomAtom } from "../atoms";

const useJoinedRoom = () => {
  const [joinedRoom, setJoinedRoom] = useRecoilState(joinedRoomAtom);

  return { joinedRoom, setJoinedRoom };
};

export default useJoinedRoom;
