/* eslint-disable @typescript-eslint/no-empty-function */
// prettier-ignore
const storage: Storage = typeof window !== "undefined"
  ? window.localStorage
  : ({
    setItem: () => {},
    getItem: () => {},
  } as any);
/* eslint-enable @typescript-eslint/no-empty-function */

export const saveItemToLS = (key: string, value: any) => {
  try {
    let storageItem;
    if (typeof value === "object") {
      storageItem = JSON.stringify(value);
    } else {
      storageItem = value;
    }

    storage.setItem(key, storageItem);
  } catch (err) {
    console.warn(err);
  }
};

export const getItemFromLS = (key: string) => {
  try {
    let storageItem;
    const value = storage.getItem(key);

    try {
      storageItem = JSON.parse(value as any);
    } catch (e) {
      storageItem = value;
    }

    return storageItem;
  } catch (err) {
    console.warn(err);
  }

  return {};
};
