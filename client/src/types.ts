import Peer from "simple-peer";

export interface Call {
  isRecievedCall: boolean;
  from: string;
  name: string;
  signal: Peer.SignalData | string;
}

export interface Context {
  call: Call;
  callAccepted: boolean;
  myVideo: React.MutableRefObject<HTMLVideoElement | null>;
  userVideo: React.MutableRefObject<HTMLVideoElement | null>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  answerCall: () => void;
  declineCall: () => void;
  leaveCall: () => void;
  isAudio: boolean;
  setIsAudio: React.Dispatch<React.SetStateAction<boolean>>;
  isVideo: boolean;
  setIsVideo: React.Dispatch<React.SetStateAction<boolean>>;
  mediaStream: React.MutableRefObject<MediaStream | undefined>;
}
