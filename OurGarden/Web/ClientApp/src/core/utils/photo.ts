import { IPhoto, IPhotoField } from "@core/interfaces/IPhoto";

const getFirstPhoto = (item: IPhotoField): IPhoto | null => {
  if (!item) {
    return null;
  }

  let photo: IPhoto | null = null;

  const { photos } = item;

  if (photos && photos.length) {
    [photo] = photos;
  }

  return photo;
};

export const getPhotoSrc = (item: IPhotoField) => {
  const photo = getFirstPhoto(item);

  return (photo && photo.url) || "";
};

export const getPreviewPhotoSrc = (item: IPhotoField) => {
  const photo = getFirstPhoto(item);

  return (photo && (photo.previewUrl || photo.url)) || "";
};
