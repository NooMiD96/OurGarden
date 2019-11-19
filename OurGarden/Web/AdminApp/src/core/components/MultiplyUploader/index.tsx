import React from "react";

import Upload, { UploadFile, UploadChangeParam } from "@core/antd/Upload";
import Modal from "@core/antd/Modal";
import UploadButton from "@core/components/UploadButton";
import { CropImage } from "@core/components/CropImage";

import { UPLOAD_LIST, customRequest } from "./constants";
import { getBase64 } from "@core/helpers/files/index";

import { IProps, IState } from "./IMultiplyUploader";

import "react-image-crop/dist/ReactCrop.css";

export class MultiplyUploader extends React.Component<IProps, IState> {
  state: IState = {
    isPreviewVisible: false,
    previewImage: undefined
  };

  previewHandler = async (file: UploadFile) => {
    if (!file.url) {
      file.url = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file,
      isPreviewVisible: true
    });
  };

  successHandler = (info: UploadChangeParam) => {
    switch (info.file.status) {
      case "done":
        if (info.fileList) {
          this.props.updateAddedList(info.fileList);
        }
        this.previewHandler(
          info.fileList.find(fl => fl.uid === info.file.uid)!
        );
        break;
      default:
        break;
    }
  };

  removeHandler = (file: UploadFile) => {
    if (!file.originFileObj) {
      this.props.updateRemovedList(file.name);
    } else {
      this.props.removeFile(file.uid);
    }
  };

  setPreviewImage = (croppedImageUrl: string) => {
    if (this.state.previewImage) {
      if (this.state.previewImage.originFileObj) {
        // !!!!!!!!Mutation!!!!!!!!
        this.state.previewImage.preview = croppedImageUrl;
      } else {
        this.props.updatePreview(this.state.previewImage.uid, croppedImageUrl);
      }
    }
  };

  cancelHandler = () =>
    this.setState({ isPreviewVisible: false, previewImage: undefined });

  render() {
    const { isPreviewVisible, previewImage } = this.state;
    const { defaultFileList } = this.props;

    return (
      <>
        <Upload
          listType="picture-card"
          defaultFileList={defaultFileList}
          multiple
          onChange={this.successHandler}
          onRemove={this.removeHandler}
          onPreview={this.previewHandler}
          showUploadList={UPLOAD_LIST}
          customRequest={customRequest}
        >
          <UploadButton />
        </Upload>

        <Modal
          visible={isPreviewVisible}
          footer={null}
          onCancel={this.cancelHandler}
          width="50%"
        >
          {previewImage && (
            <CropImage
              previewImage={previewImage}
              setPreviewImage={this.setPreviewImage}
              onClose={this.cancelHandler}
            />
          )}
        </Modal>
      </>
    );
  }
}

export default MultiplyUploader;
