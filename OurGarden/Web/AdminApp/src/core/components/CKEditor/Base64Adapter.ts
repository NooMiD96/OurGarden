export default class Adapter {
  private loader: any;
  private reader: FileReader | null = null;
  /**
   * Creates a new adapter instance.
   *
   * @param {module:upload/filerepository~FileLoader} loader
   */
  constructor(loader: any) {
    /**
     * `FileLoader` instance to use during the upload.
     *
     * @member {module:upload/filerepository~FileLoader} #loader
     */
    this.loader = loader;
  }

  /**
   * Starts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#upload
   * @returns {Promise}
   */
  upload() {
    return new Promise((resolve, reject) => {
      const reader = (this.reader = new FileReader());

      reader.addEventListener("load", () => {
        resolve({ default: reader.result });
      });

      reader.addEventListener("error", err => {
        reject(err);
      });

      reader.addEventListener("abort", () => {
        reject();
      });

      this.loader.file.then((file: any) => {
        reader.readAsDataURL(file);
      });
    });
  }

  /**
   * Aborts the upload process.
   *
   * @see module:upload/filerepository~UploadAdapter#abort
   * @returns {Promise}
   */
  abort() {
    this.reader && this.reader.abort();
  }
}
