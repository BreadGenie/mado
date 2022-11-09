import { MediaConnection } from "peerjs";

export interface Call {
  isRecievedCall: boolean;
  from: string;
  name: string;
  isVideo: boolean;
}

export interface Context {
  myVideo: React.MutableRefObject<HTMLVideoElement | null>;
  userVideo: React.MutableRefObject<HTMLVideoElement | null>;
  callRef: React.MutableRefObject<MediaConnection | null>;
}
