// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../ui/material/material.module";
// components
import { AudioComponent } from './audio.component';
import { PlaylistComponent } from "./components/playlist/playlist.component";
import { PlayerComponent } from "./components/player/player.component";
// services
import { PlaylistService } from "./service/playlist.service";
import { PlayerService } from "./service/player.service";
import AudioManagerService from "./service/manager.service";

@NgModule({
  declarations: [
    AudioComponent,
    PlaylistComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
    PlaylistService,
    PlayerService,
    AudioManagerService
  ],
  exports: [AudioComponent]
})
export class AudioModule { }
