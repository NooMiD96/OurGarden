export interface IPhoto {
  photoId: string;
  name: string;
  date: Date;
  url: string;
  previewUrl?: string;
}

export interface IPhotoField {
  photos: IPhoto[];
}
