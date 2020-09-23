import {
  RcCustomRequestOptions,
  ShowUploadListInterface,
} from "@core/antd/Upload";

export const UPLOAD_LIST: ShowUploadListInterface = {
  showPreviewIcon: true,
  showRemoveIcon: true,
  showDownloadIcon: true,
};

export const customRequest = ({ onSuccess, file }: RcCustomRequestOptions) => {
  setTimeout(() => {
    onSuccess({ status: "ok" }, file);
  }, 0);
};
