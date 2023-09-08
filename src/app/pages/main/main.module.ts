import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { AudioModule } from "../../features/audio/audio.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    AudioModule,
  ],
  exports: [MainComponent]
})
export class MainModule { }
