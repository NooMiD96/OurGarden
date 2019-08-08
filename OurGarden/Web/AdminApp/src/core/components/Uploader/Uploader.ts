import message from "@src/core/antd/message";

import { UploadFile } from "@src/core/antd/Upload";

const getBase64 = (
  callback: (payload: string | ArrayBuffer) => void,
  img?: File
) => {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => reader.result && callback(reader.result)
  );
  if (img != null) reader.readAsDataURL(img);
};

const validateFile = (file: UploadFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Вы можете загружать файлы только с расширением JPG/PNG !");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Фотография должна быть мешьше 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export {
  getBase64,
  validateFile
};
