import { Crop } from "react-image-crop";

import { UploadFile } from "@core/antd/Upload";

export interface IProps {
  previewImage: UploadFile;
  setPreviewImage: (croppedImageUrl: string) => void;
  onClose: () => void;
}

export interface IState {
  crop: Crop;
  croppedImageUrl?: string;
}
