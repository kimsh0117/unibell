export interface AudioFormat {
  _id: number;
  _audio_name: string
  _file_name: string
}

export type StreamState = {
  playing: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration?: number;
  currentTime?: number;
  canplay: boolean;
  error: boolean;
}
