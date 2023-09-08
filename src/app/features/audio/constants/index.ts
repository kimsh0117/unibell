import {Injectable} from "@angular/core";

@Injectable()
export class Constants {
  public static ENDED = 'ended'
  public static ERROR = 'error'
  public static PLAY = 'play'
  public static PLAYING = 'playing'
  public static PAUSE = 'pause'
  public static TIME_UPDATE = 'time_update'
  public static CAN_PALY = 'can_play'
  public static LOADED_METADATA = 'loaded_metadata'
  public static LOAD_START = 'load_start'

  constructor() {
  }
}

export default Constants
