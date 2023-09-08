import {Component} from '@angular/core';
import {PlaylistService} from "../../service/playlist.service";
import {PlayerService} from "../../service/player.service";
import {StreamState} from "../../model/type";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent  {
  state: StreamState | undefined;
  constructor(
    private playlist: PlaylistService,
    private playerService: PlayerService
  ) {
    this.playerService
      .getState()
      .subscribe(state => {
        this.state = state;
      })
  }

  get current() {
    return this.playlist.selected
  }
  isFirstPlaying() {
    return this.playerService.isFirstPlaying();
  }

  isLastPlaying() {
    return this.playerService.isLastPlaying();
  }
  play(): void {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause()
  }

  next() {
    this.playerService.next()
  }
  previous() {
    this.playerService.previous()
  }
  onSliderChangeEnd(change: any) {
    this.playerService.seekTo(change.value)
  }
}
