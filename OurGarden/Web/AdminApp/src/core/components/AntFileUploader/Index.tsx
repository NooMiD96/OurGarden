import React from "react";
import { IImageUploaderProps, IImageUploaderState } from "./IImageUploader";
import Upload, { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { Icon } from "@src/core/antd";
import Uploader from "./style/Uploader.style";

function getBase64(
  callback: (payload: string | ArrayBuffer) => void,
  img?: File
) {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => reader.result && callback(reader.result)
  );
  if (img != null) reader.readAsDataURL(img);
}

function beforeUpload(file: UploadFile) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    alert("Вы можете загружать файлы только с расширением JPG/PNG !");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert("Фотография должна быть мешьше 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export class ImageUploader extends React.PureComponent<
  IImageUploaderProps,
  IImageUploaderState
> {
  state: IImageUploaderState = {
    loading: false,
    imageUrl: this.props.oldImageUrl as string
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
      getBase64(
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Загрузить изображение</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <Uploader className="image-block">
        <Upload
          name="img"
          listType="picture-card"
          className="image-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl as string} alt="img" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Uploader>
    );
  }
}
