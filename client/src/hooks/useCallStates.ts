import { useRecoilState } from "recoil";

import {
  meAtom,
  callAtom,
  nameAtom,
  streamAtom,
  isAudioAtom,
  isVideoAtom,
  roomNameAtom,
  callEndedAtom,
  joinedRoomAtom,
  isCallerMutedAtom,
} from "../atoms";

const useCallStates = () => {
  const [me, setMe] = useRecoilState(meAtom);
  const [call, setCall] = useRecoilState(callAtom);
  const [name, setName] = useRecoilState(nameAtom);
  const [stream, setStream] = useRecoilState(streamAtom);
  const [isAudio, setIsAudio] = useRecoilState(isAudioAtom);
  const [isVideo, setIsVideo] = useRecoilState(isVideoAtom);
  const [roomName, setRoomName] = useRecoilState(roomNameAtom);
  const [callEnded, setCallEnded] = useRecoilState(callEndedAtom);
  const [joinedRoom, setJoinedRoom] = useRecoilState(joinedRoomAtom);
  const [isCallerMuted, setIsCallerMuted] = useRecoilState(isCallerMutedAtom);

  return {
    me,
    setMe,
    name,
    setName,
    call,
    setCall,
    stream,
    setStream,
    isAudio,
    setIsAudio,
    isVideo,
    setIsVideo,
    roomName,
    setRoomName,
    callEnded,
    setCallEnded,
    joinedRoom,
    setJoinedRoom,
    isCallerMuted,
    setIsCallerMuted,
  };
};

export default useCallStates;
