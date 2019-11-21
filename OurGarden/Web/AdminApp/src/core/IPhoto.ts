export interface IPhoto {
  photoId: string;
  name: string;
  date: Date;
  url: string;
  previewUrl: string;
}

export interface IMultiplyPhotoDTO {
  addFiles: File[];
  removeFiles: string[];
  updateFiles: File[];
}
