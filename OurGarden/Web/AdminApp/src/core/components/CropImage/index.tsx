import React from "react";
import ReactCrop from "react-image-crop";

import Button from "@core/antd/Button";

import { CROP_CONFIG } from "./constants";

import { IProps, IState } from "./ICropImage";

export class CropImage extends React.Component<IProps, IState> {
  imageRef?: HTMLImageElement;

  constructor(props: IProps) {
    super(props);

    // prettier-ignore
    const crop = {
      ...CROP_CONFIG,
      width: props.minWidth || CROP_CONFIG.width,
      height: props.minHeight || CROP_CONFIG.height,
      aspect:
        (props.minWidth || CROP_CONFIG.width)! / (props.minHeight || CROP_CONFIG.height)!
    };

    this.state = {
      crop,
      croppedImageUrl: props.previewImage.preview,
    };
  }

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
    // prettier-ignore
    const {
      x = 0, y = 0, width = 0, height = 0
    } = crop;

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
      canvas.toBlob((blob) => {
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
        croppedImageUrl,
      });
      this.props.setPreviewImage(croppedImageUrl);
    }
  }

  render() {
    // prettier-ignore
    const {
      onClose,
      minHeight = CROP_CONFIG.height,
      minWidth = CROP_CONFIG.width,
      previewImageUrl,
    } = this.props;
    const { crop, croppedImageUrl } = this.state;

    return (
      <>
        <div style={{ marginTop: 24 }}>
          <span title="Оригинальное изображение">Оригинал</span>
          <div>
            {previewImageUrl && (
              <ReactCrop
                src={previewImageUrl}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                minWidth={minWidth}
                minHeight={minHeight}
              />
            )}
          </div>
        </div>
        <div>
          <span
            title={`Изображение, которое пользователь будет видеть: ${minWidth}x${minHeight}`}
          >
            Предпросмотр
          </span>
          {croppedImageUrl && (
            <div
              style={{
                width: minWidth,
                height: minHeight,
                maxWidth: "100%",
                maxHeight: "100%",
                background: `no-repeat center / contain url(${croppedImageUrl})`,
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
