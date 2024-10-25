export type songData = {
    id: string;
    title: string;
    artist: string;
    url: string;
    userId?: string;
    albumImageURL?: string;
  };
  
  export default class Song {
    constructor(
      private _id: string,
      private _title: string,
      private _artist: string,
      private _url: string,
      private _userId?: string,
      private _albumImageURL?: string
    ) {}
  
    public get artist(): string {
      return this._artist;
    }
    public set artist(value: string) {
      this._artist = value;
    }
    public get title(): string {
      return this._title;
    }
    public set title(value: string) {
      this._title = value;
    }
    public get url(): string {
      return this._url;
    }
    public set url(value: string) {
      this._url = value;
    }
    public get userId(): string | undefined {
      return this._userId;
    }
    public set userId(value: string) {
      this._userId = value;
    }
    public get id(): string {
      return this._id;
    }
    public set id(value: string) {
      this._id = value;
    }
    public get albumImageURL(): string | undefined {
      return this._albumImageURL;
    }
    public set albumImageURL(value: string) {
      this._albumImageURL = value;
    }
  
    toJSON(): songData {
      return {
        id: this.id,
        title: this.title,
        artist: this.artist,
        url: this.url,
        userId: this.userId,
        albumImageURL: this.albumImageURL,
      };
    }
  }
  