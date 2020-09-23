import { Crop } from "react-image-crop";

import { UploadFile } from "@core/antd/Upload";

export interface IProps {
  previewImage: UploadFile;
  previewImageUrl?: string;
  setPreviewImage: (croppedImageUrl: string) => void;
  onClose: () => void;
  minWidth?: number;
  minHeight?: number;
}

export interface IState {
  crop: Crop;
  croppedImageUrl?: string;
}
