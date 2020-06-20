import { TProductItem, TNewsItem } from "./ILinkGenerator";

export const GetLinkToProduct = ({
  categoryId = "",
  subcategoryId = "",
  productId = "",
}: TProductItem) => {
  let link = "/Catalog";

  if (!categoryId) {
    return link;
  }
  link = `${link}/${categoryId}`;

  if (!subcategoryId) {
    return link;
  }
  link = `${link}/${subcategoryId}`;

  if (!productId) {
    return link;
  }
  link = `${link}/${productId}`;

  return link;
};

export const GetLinkToNews = ({ newsId }: TNewsItem) => {
  let link = "/News";

  if (!newsId) {
    return link;
  }
  link = `${link}/${newsId}`;

  return link;
};
