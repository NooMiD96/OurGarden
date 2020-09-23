import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "./IPhotoUtils";
import { IPhoto } from "@src/core/IPhoto";

const convertBlobToFile = (blob: Blob, fileName = "") => {
  const file: any = blob;

  file.lastModified = new Date().getTime();
  file.name = fileName;

  return file as File;
};

const getPreviewFileByBlobUrl = async (url: string, fileName = "") => {
  const blob = await fetch(url).then((res) => res.blob());

  return convertBlobToFile(blob, fileName);
};

export const getAddFilesDTO = async (files: UploadFile[]): Promise<File[]> => {
  const filesDTO: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.originFileObj) {
      filesDTO.push(file.originFileObj as File);

      // eslint-disable-next-line no-await-in-loop
      const previewFile = await getPreviewFileByBlobUrl(
        file.preview!,
        file.name
      );
      filesDTO.push(previewFile);
    }
  }

  return filesDTO;
};

export const getUpdateFilesDTO = async (
  files: IUpdateFile[]
): Promise<File[]> => {
  const filesDTO: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // eslint-disable-next-line no-await-in-loop
    const previewFile = await getPreviewFileByBlobUrl(file.url, file.uid);
    filesDTO.push(previewFile);
  }

  return filesDTO;
};

export const getDefaultFileList = (photos: IPhoto[]) => {
  if (!photos) {
    return [];
  }

  // prettier-ignore
  return photos.map(
    (photo) => ({
      uid: photo.photoId,
      name: photo.photoId,
      status: "done",
      url: photo.url,
      preview: photo.previewUrl,
    } as UploadFile)
  );
};

export const updatePreview = (
  updateFiles: IUpdateFile[],
  setUpdateFiles: React.Dispatch<React.SetStateAction<IUpdateFile[]>>,
  { uid, url }: IUpdateFile
) => {
  const findIndex = updateFiles.findIndex((x) => x.uid === uid);

  if (findIndex !== -1) {
    setUpdateFiles(
      updateFiles.map((x, index) => {
        if (index === findIndex) {
          return { uid, url };
        }
        return x;
      })
    );
  } else {
    setUpdateFiles([...updateFiles, { uid, url }]);
  }
};
