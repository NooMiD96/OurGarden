import { IUserCardProduct } from "@src/components/UserCard/State";

export const findProduct = (
  origin: IUserCardProduct,
  target: IUserCardProduct
) => {
  const { product: originProduct } = origin;
  const { product: targetProduct } = target;

  // prettier-ignore
  return (
    originProduct.categoryId === targetProduct.categoryId
    && originProduct.subcategoryId === targetProduct.subcategoryId
    && originProduct.productId === targetProduct.productId
  );
};

// prettier-ignore
export const getTotalCount = (productList: IUserCardProduct[]) => productList.map((x) => x.count).reduce((count, acc) => count + acc, 0);

export const addNewProduct = (
  productList: IUserCardProduct[],
  newProduct: IUserCardProduct
) => {
  const newProductList: IUserCardProduct[] = [];
  let find = false;

  productList.forEach((product) => {
    if (findProduct(product, newProduct)) {
      newProductList.push({
        ...product,
        count: product.count + newProduct.count
      });
      find = true;
    } else {
      newProductList.push(product);
    }
  });

  if (!find) {
    newProductList.push(newProduct);
  }

  return newProductList;
};

export const changeCountOfProduct = (
  productList: IUserCardProduct[],
  newProduct: IUserCardProduct
) => {
  const newProductList: IUserCardProduct[] = [];

  productList.forEach((product) => {
    if (findProduct(product, newProduct)) {
      newProductList.push({
        ...product,
        count: newProduct.count
      });
    } else {
      newProductList.push(product);
    }
  });

  return newProductList;
};
