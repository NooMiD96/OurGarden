export interface IImageUploaderProps {
  onUpload: Function;
  oldImageUrl: string | ArrayBuffer;
}

export interface IImageUploaderState {
  imageUrl: string | ArrayBuffer;
  loading: boolean;
}
