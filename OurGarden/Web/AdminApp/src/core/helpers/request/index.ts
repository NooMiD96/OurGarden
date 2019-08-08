const generateFormBody = <T extends { file: File }>(data: T) => {
  const formData = new FormData();

  let key: keyof typeof data;
  for (key in data) {
    if (data.hasOwnProperty(key) && data[key]) {
      let field = data[key];
      if (typeof field !== "string") {
        field = field.toString();
      }

      formData.append(`${key[0].toUpperCase()}${key.slice(1).toLowerCase()}`, field);
    }
  }

  formData.delete("File");
  formData.set("file", data.file);

  return formData;
};

export {
  generateFormBody
};
