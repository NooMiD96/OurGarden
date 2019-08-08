export interface IImageUploaderProps {
  onUpload: Function;
  oldImageUrl: string | ArrayBuffer | null;
}

export interface IImageUploaderState {
  imageUrl: string | ArrayBuffer;
  loading: boolean;
}
