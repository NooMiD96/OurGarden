import { ICategoryDictionary } from "@components/Category/State";

export const parseCategoryIdField = <T extends any>(
  field: string,
  data: T,
  categoryList?: ICategoryDictionary[]
) => {
  if (categoryList) {
    const idValue = data[field!];
    const findedCategory = categoryList.find(x => x.categoryId == idValue);
    if (findedCategory) {
      return findedCategory.alias;
    }
  }

  return parseIdField(field, data);
};

export const parseSubcategoryIdField = <T extends any>(
  field: string,
  data: T,
  categoryList?: ICategoryDictionary[]
) => {
  if (categoryList) {
    const { categoryId } = data;
    const category = categoryList.find(x => x.categoryId == categoryId);

    if (category) {
      const idValue = data[field!];
      const findedSubategory = category.subcategories.find(
        x => x.subcategoryId == idValue
      );

      if (findedSubategory) {
        return findedSubategory.alias;
      }
    }
  }

  return parseIdField(field, data);
};

export const parseIdField = <T extends any>(field: string, data: T) => {
  const idValue = data[field];
  const value = idValue.replace(/-/g, " ");
  return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
};
