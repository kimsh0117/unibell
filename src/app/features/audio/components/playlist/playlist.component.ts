import {Component} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";
import AudioModel from "../../model/audio.model";
import {PlayerService} from "../../service/player.service";
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent  {
  constructor(
    private playlistService: PlaylistService,
    private playerService: PlayerService
  ) {
  }
  columns = ['_id', '_audio_name', '_file_name']

  get playlist() {
    return this.playlistService.playlist
  }

  setSelected(audio: AudioModel): void {
    this.playlistService.selected = audio
    this.playerService.start()
  }
  get selected() {
    return this.playlistService.selected
  }
}
