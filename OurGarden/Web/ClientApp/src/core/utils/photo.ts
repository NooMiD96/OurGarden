import { IPhoto } from "@core/IPhoto";
import { ICategory } from "@components/Category/State";
import { ISubcategory } from "@components/Subcategory/State";
import { IProduct } from "@components/Product/State";
import { INew } from "@components/News/State";

const getFirstPhoto = (
  item: ICategory | ISubcategory | IProduct | INew
): IPhoto | null => {
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

export const getPhotoSrc = (
  item: ICategory | ISubcategory | IProduct | INew
) => {
  const photo = getFirstPhoto(item);

  return (photo && photo.url) || "";
};

export const getPreviewPhotoSrc = (
  item: ICategory | ISubcategory | IProduct | INew
) => {
  const photo = getFirstPhoto(item);

  return (photo && (photo.previewUrl || photo.url)) || "";
};
