import React from "react";

import Upload, { UploadFile, UploadChangeParam } from "@core/antd/Upload";
import Modal, { confirm } from "@core/antd/Modal";
import UploadButton from "@core/components/UploadButton";
import { CropImage } from "@core/components/CropImage";
import message from "@core/antd/message";

import { UPLOAD_LIST, customRequest } from "./constants";
import { getBase64 } from "@core/helpers/files/index";
import { copyToClipboard } from "@core/utils";

import { IProps, IState } from "./IMultiplyUploader";

import "react-image-crop/dist/ReactCrop.css";

const COPY_IMAGE_URL_ERROR = `Для того, чтобы использовать изображение в описании, необходимо сначала его сохранить.
Сохраните данные изменения и затем отредактируйте их.
После этого ссылка на данную картинку будет скопирована.`;

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

  downloadhandler = (file: UploadFile) => {
    if (file.originFileObj) {
      confirm({
        title: "Предупреждение!",
        className: "ant-modal-confirm-warning",
        content: COPY_IMAGE_URL_ERROR,
        cancelButtonProps: { style: { display: "none" } }
      });
    } else if (document !== undefined) {
      const success = copyToClipboard(
        `${document.location.origin}/${file.url}`
      );
      if (success) {
        message.success("Ссылка на картинку успешно скопирована!");
      } else {
        message.error("Не удалось скопировать ссылку на картинку!");
      }
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
          onDownload={this.downloadhandler}
          onPreview={this.previewHandler}
          showUploadList={UPLOAD_LIST}
          customRequest={customRequest}
          accept="image/*"
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
