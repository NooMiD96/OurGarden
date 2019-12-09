import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "@src/core/utils/photo/IPhotoUtils";

export interface IMultiplyUploaderForm {
  defaultFileList: UploadFile<any>[];
  addFiles: UploadFile[];
  setAddFiles: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  updateFiles: IUpdateFile[];
  setUpdateFiles: React.Dispatch<React.SetStateAction<IUpdateFile[]>>;
  removeFiles: string[];
  setRemoveFiles: React.Dispatch<React.SetStateAction<string[]>>;
}
