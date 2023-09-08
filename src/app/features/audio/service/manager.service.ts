import {Injectable} from "@angular/core";
import {IManagerService} from "./type";
import {Subject} from "rxjs";

@Injectable()
export class AudioManagerService implements IManagerService {
  play(dom: HTMLAudioElement) {
    dom.play()
  }
  pause(dom: HTMLAudioElement) {
    dom.pause()
  }
  stop<T>(subject: Subject<T>) {
    // @ts-ignore
    subject.next(null)
    subject.complete()
  }
  seekTo(dom: HTMLAudioElement, seconds: number) {
    dom.currentTime = seconds;
  }
}

export default AudioManagerService
