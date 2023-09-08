class MediaModel {
  private _id: number;
  private _audio_name: string;
  private _file_name: string;
  constructor(
    id: number,
    audio_name: string,
    file_name: string
  ) {
    this._id = id;
    this._audio_name = audio_name;
    this._file_name = file_name;
  }

  get id(): number {
    return this._id;
  }

  get audio_name(): string {
    return this._audio_name;
  }

  get file_name(): string {
    return this._file_name;
  }
}

export default MediaModel
