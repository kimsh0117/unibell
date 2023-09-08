import { Subject } from "rxjs";

export interface IManagerService {
  play(obj: HTMLAudioElement | HTMLVideoElement): void;
  pause(obj: HTMLAudioElement | HTMLVideoElement): void;
  stop<T>(subject: Subject<T>): void;
  seekTo(obj: HTMLAudioElement | HTMLVideoElement, second: number): void
}
