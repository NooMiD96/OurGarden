function getBase64(file: File | Blob | undefined): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve((reader.result || undefined) as string | undefined);
      reader.onerror = error => reject(error);
    }
  });
}

export { getBase64 };
