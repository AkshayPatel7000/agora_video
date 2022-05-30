import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "ed09f06f1eb445568d20a8c518f87c85";
const token =
  "006ed09f06f1eb445568d20a8c518f87c85IABapPzz1Fm6WlrjmFBbAE7AFNfA8SpcPqjcWsR/cuHYTeJyGcsAAAAAEACjPQT8VHaQYgEAAQBUdpBi";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "video_call";
