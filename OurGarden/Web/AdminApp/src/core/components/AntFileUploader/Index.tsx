import React from "react";

import Upload, { UploadChangeParam, UploadFile } from "@core/antd/Upload";
import Icon from "@src/core/antd/Icon";
import message from "@src/core/antd/message";

import UploadWrapper from "./style/Uploader.style";

import { IImageUploaderProps, IImageUploaderState } from "./IImageUploader";

export class ImageUploader extends React.PureComponent<
  IImageUploaderProps,
  IImageUploaderState
> {
  state: IImageUploaderState = {
    loading: false,
    imageUrl: this.props.oldImageUrl as string
  };

  getBase64 = (
    callback: (payload: string | ArrayBuffer) => void,
    img?: File
  ) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => reader.result && callback(reader.result)
    );
    if (img != null) reader.readAsDataURL(img);
  };

  beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Вы можете загружать файлы только с расширением JPG/PNG !");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Фотография должна быть мешьше 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      this.setState({
        loading: true
      });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(
        imageUrl =>
          this.setState(
            {
              imageUrl,
              loading: false
            },
            this.props.onUpload(imageUrl)
          ),
        info.file.originFileObj
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;

    return (
      <UploadWrapper className="image-block">
        <Upload
          name="img"
          listType="picture-card"
          className="image-uploader"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          accept="image/png, image/jpeg"
          disabled={loading}
        >
          {imageUrl ? (
            <img src={imageUrl as string} alt="img" style={{ width: "100%" }} />
          ) : (
            <div>
              <Icon type={loading ? "loading" : "plus"} />
              <div className="ant-upload-text">Загрузить изображение</div>
            </div>
          )}
        </Upload>
      </UploadWrapper>
    );
  }
}
