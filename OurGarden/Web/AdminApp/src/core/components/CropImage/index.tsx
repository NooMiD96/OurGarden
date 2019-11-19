import React from "react";
import ReactCrop from "react-image-crop";

import Button from "@core/antd/Button";

import { CROP_CONFIG } from "./constants";

import { IProps, IState } from "./ICropImage";

export class CropImage extends React.Component<IProps, IState> {
  imageRef?: HTMLImageElement;
  state: IState = {
    crop: { ...CROP_CONFIG },
    croppedImageUrl: this.props.previewImage.preview
  };

  onImageLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;

    return !this.props.previewImage.preview;
  };

  onCropChange = (crop: ReactCrop.Crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop: ReactCrop.Crop) => {
    this.makeClientCrop(crop);
  };

  getCroppedImg(
    image: HTMLImageElement,
    crop: ReactCrop.Crop
  ): Promise<string> {
    const { x = 0, y = 0, width = 0, height = 0 } = crop;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      image,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve, _reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        // blob.name = fileName;
        this.fileUrl && window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  async makeClientCrop(crop: ReactCrop.Crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop);
      this.setState({
        croppedImageUrl
      });
      this.props.setPreviewImage(croppedImageUrl);
    }
  }

  render() {
    const { previewImage, onClose } = this.props;
    const { crop, croppedImageUrl } = this.state;

    return (
      <>
        <div style={{ marginTop: 24 }}>
          <span title="Оригинальное изображение">Оригинал</span>
          <div>
            {previewImage.url && (
              <ReactCrop
                src={previewImage.url}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                minWidth={400}
                minHeight={350}
              />
            )}
          </div>
        </div>
        <div>
          <span title="Изображение которое пользователь будет видеть">
            Предпросмотр
          </span>
          {croppedImageUrl && (
            <div
              style={{
                width: 400,
                height: 350,
                background: `no-repeat center / contain url(${croppedImageUrl})`
              }}
            />
          )}
        </div>
        <div className="ant-modal-footer">
          <Button type="primary" onClick={onClose}>
            Ок
          </Button>
        </div>
      </>
    );
  }
}
