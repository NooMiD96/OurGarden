import React from "react";

import Upload, { UploadChangeParam, UploadFile } from "@core/antd/Upload";
import Icon from "@src/core/antd/Icon";

import { getBase64, validateFile } from "./Uploader";

import UploadWrapper from "./style/Uploader.style";

import { IImageUploaderProps, IImageUploaderState } from "./IImageUploader";

export class FileUploader extends React.PureComponent<
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
      this.props.onUpload(info.file.originFileObj);
      // Get this url from response in real world.
      getBase64(
        imageUrl =>
          this.setState({
            imageUrl,
            loading: false
          }),
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
          beforeUpload={validateFile}
          onChange={this.handleChange}
          accept="image/png, image/jpeg"
          disabled={loading}
          action=""
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
