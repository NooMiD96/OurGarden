import { UploadFile } from "@core/antd/Upload";

export interface IProps {
  defaultFileList: UploadFile[];
  updateAddedList: (addedList: UploadFile[]) => void;
  updateRemovedList: (removedList: string) => void;
  removeFile: (fileUid: string) => void;
  updatePreview: (fileUid: string, fileUrl: string) => void;
}

export interface IState {
  isPreviewVisible: boolean;
  previewImage?: UploadFile;
}
