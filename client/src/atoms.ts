import { RecoilState, atom } from "recoil";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { Call } from "./types";

const randomRoomName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals],
  separator: "",
  style: "capital",
});

export const streamAtom: RecoilState<MediaStream | undefined> = atom({
  key: "stream",
  default: undefined,
});

export const meAtom = atom({
  key: "me",
  default: "",
});

export const callAtom: RecoilState<Call> = atom({
  key: "call",
  default: {
    isRecievedCall: false,
    from: "",
    name: "",
    isVideo: true,
  },
});

export const joinedRoomAtom = atom({
  key: "joinedRoom",
  default: false,
});

export const callEndedAtom = atom({
  key: "callEnded",
  default: false,
});

export const roomNameAtom = atom({
  key: "roomName",
  default: randomRoomName,
});

export const nameAtom = atom({
  key: "name",
  default: localStorage.getItem("userName") || "",
});

export const isAudioAtom = atom({
  key: "isAudio",
  default: true,
});

export const isVideoAtom = atom({
  key: "isVideo",
  default: true,
});

export const isCallerMutedAtom = atom({
  key: "isCallerMuted",
  default: false,
});
