export interface Call {
  isRecievedCall: boolean;
  from: string;
  name: string;
  isVideo: boolean;
}

export interface Context {
  serverLoading: boolean;
  call: Call;
  joinedRoom: boolean;
  myVideo: React.MutableRefObject<HTMLVideoElement | null>;
  userVideo: React.MutableRefObject<HTMLVideoElement | null>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  joinRoom: (id: string) => void;
  leaveCall: () => void;
  isAudio: boolean;
  setIsAudio: React.Dispatch<React.SetStateAction<boolean>>;
  isVideo: boolean;
  setIsVideo: React.Dispatch<React.SetStateAction<boolean>>;
  isCallerMuted: boolean;
  setIsCallerMuted: React.Dispatch<React.SetStateAction<boolean>>;
  mediaStream: React.MutableRefObject<MediaStream | undefined>;
}
