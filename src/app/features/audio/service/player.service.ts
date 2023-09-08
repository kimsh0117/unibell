import {Injectable} from "@angular/core";
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { PlaylistService } from "./playlist.service";
import { StreamState } from "../model/type";
import AudioManagerService from "./manager.service";

const initialState: StreamState = {
  playing: false,
  readableCurrentTime: '',
  readableDuration: '',
  duration: undefined,
  currentTime: undefined,
  canplay: false,
  error: false
}
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audioObj = new Audio();

  private stop$ = new Subject();
  private state: StreamState = initialState

  constructor(
    private playlist: PlaylistService,
    private manager: AudioManagerService
  ) {
  }

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ]
  isFirstPlaying() {
    return this.playlist.selected?.id === this.playlist.playlist[0].id;
  }
  isLastPlaying() {
    return this.playlist.selected?.id === this.playlist.playlist[this.playlist.playlist.length - 1].id;
  }

  play() {
    this.manager.play(this.audioObj)
  }

  pause() {
    this.manager.pause(this.audioObj)
  }

  seekTo(seconds: number) {
    this.manager.seekTo(this.audioObj, seconds)
  }
  next() {
    const curr = this.playlist.selected
    const index = this.playlist.playlist.findIndex( audio => audio.id === curr?.id)
    this.playlist.selected = this.playlist.playlist[index + 1]
    this.start()
  }
  previous() {
    const curr = this.playlist.selected
    const index = this.playlist.playlist.findIndex( audio => audio.id === curr?.id)
    this.playlist.selected = this.playlist.playlist[index - 1]
    this.start()
  }
  stop() {
    this.manager.stop(this.stop$)
  }
  start() {
    this.stop()
    return this.playStream().subscribe()
  }
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
  private streamObservable() {
    const url = `/assets/mp3/${this.playlist.selected?.file_name}`
    return new Observable((observer) => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }
  playStream() {
    return this.streamObservable()
      .pipe(
        takeUntil(this.stop$)
      );
  }
  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }
  private resetState() {
    this.state = initialState
  }
  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
}
