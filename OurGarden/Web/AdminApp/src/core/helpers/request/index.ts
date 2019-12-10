import _isNil from "lodash.isnil";

type TBody<T> = T & {
  file?: File | null;
  addFiles?: File[] | null;
  updateFiles?: File[] | null;
};

const generateFormBody: <T>(data: TBody<T>) => FormData = data => {
  const formData = new FormData();

  let key: keyof typeof data;
  for (key in data) {
    if (data.hasOwnProperty(key) && !_isNil(data[key])) {
      let field = data[key];
      if (typeof field !== "string") {
        field = field.toString();
      }

      formData.append(
        `${key[0].toUpperCase()}${key.slice(1).toLowerCase()}`,
        field
      );
    }
  }

  if (data.file) {
    formData.delete("File");
    formData.set("file", data.file);
  }

  if (data.addFiles) {
    formData.delete("Addfiles");
    data.addFiles.forEach(file => {
      formData.append("AddFiles", file, file.name);
    });
  }

  if (data.updateFiles) {
    formData.delete("Updatefiles");
    data.updateFiles.forEach(file => {
      formData.append("UpdateFiles", file, file.name);
    });
  }

  return formData;
};

export { generateFormBody };
