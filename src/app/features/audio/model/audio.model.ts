import MediaModel from "./media.model";

export class AudioModel extends MediaModel {
  constructor(
     id: number,
     audio_name: string,
     file_name: string
  ) {
    super(id, audio_name, file_name)
  }

}

export default AudioModel;
