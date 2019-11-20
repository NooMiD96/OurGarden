import { IPhoto } from "@core/IPhoto";
import { ICategory } from "@components/Category/State";
import { ISubcategory } from "@components/Subcategory/State";
import { IProduct } from "@components/Product/State";

export const getPhotoSrc = (item: ICategory | ISubcategory | IProduct) => {
  const photo = getFirstPhoto(item);

  return (photo && photo.url) || "";
};

export const getPreviewPhotoSrc = (item: ICategory | ISubcategory | IProduct) => {
  const photo = getFirstPhoto(item);

  return (photo && (photo.previewUrl || photo.url)) || "";
};

const getFirstPhoto = (item: ICategory | ISubcategory | IProduct): IPhoto | null => {
  if (!item) {
    return null;
  }

  let photo: IPhoto | null = null;

  const photos = item.photos;

  if (photos && photos.length) {
    photo = photos[0];
  }

  return photo;
};
