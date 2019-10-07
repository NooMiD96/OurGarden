import _isNil from "lodash.isnil";

const generateFormBody = <
  T extends { file: File | null; addFiles: File[] | null }
>(
  data: T
) => {
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
    formData.delete("AddFiles");
    data.addFiles.forEach(file => {
      formData.append("AddFiles", file, file.name);
    });
  }

  return formData;
};

export { generateFormBody };
