import React, { useState } from "react";

import MultiplyUploader from "@src/core/components/MultiplyUploader";

import { updatePreview } from "@core/utils/photo";

import { IMultiplyUploaderForm } from "./IMultiplyUploaderForm";
import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "@src/core/utils/photo/IPhotoUtils";

export class MultiplyUploaderForm extends React.PureComponent<
  IMultiplyUploaderForm,
  {}
> {
  updatePreviewHandler = (uid: string, url: string) => {
    const { updateFiles, setUpdateFiles } = this.props;
    updatePreview(updateFiles, setUpdateFiles, { uid, url });
  };

  render() {
    const {
      defaultFileList,
      addFiles,
      setAddFiles,
      removeFiles,
      setRemoveFiles,
      ...props
    } = this.props;

    return (
      <MultiplyUploader
        defaultFileList={defaultFileList}
        updateAddedList={(files) => setAddFiles(files)}
        updateRemovedList={(file) => setRemoveFiles([...removeFiles, file])}
        // prettier-ignore
        removeFile={(fileUid) => setAddFiles(addFiles.filter((x) => x.uid !== fileUid))}
        updatePreview={this.updatePreviewHandler}
        {...props}
      />
    );
  }
}

export const useMultiplyUploaderForm = () => {
  const [addFiles, setAddFiles] = useState([] as UploadFile[]);
  const [updateFiles, setUpdateFiles] = useState([] as IUpdateFile[]);
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  return {
    addFiles,
    setAddFiles,
    updateFiles,
    setUpdateFiles,
    removeFiles,
    setRemoveFiles
  };
};

export default MultiplyUploaderForm;
