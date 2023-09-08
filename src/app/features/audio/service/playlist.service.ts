import { Injectable } from '@angular/core';
import AudioModel from "../model/audio.model";
import { allMusic } from "../model/audio.mock";

@Injectable({
  providedIn: 'root' // this means is singleton
})
export class PlaylistService {
  private _playlist: AudioModel[] = []
  private _selected: AudioModel | undefined
  constructor() {
    allMusic.forEach(({_id, _audio_name, _file_name}) => {
        this.addAudio = new AudioModel(_id, _audio_name, _file_name)
    })
  }

  get playlist(): AudioModel[] {
    return this._playlist;
  }

  set addAudio(audio: AudioModel) {
    this._playlist.push(audio)
  }
  set removeAudio(id: number) {
    this._playlist = this.playlist.filter(audio => audio.id !== id)
  }
  set selected(audio: AudioModel | undefined) {
    this._selected = audio;
  }

  get selected(): AudioModel| undefined {
    return this._selected;
  }
}
