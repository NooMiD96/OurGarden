import React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Upload, { UploadFile, UploadChangeParam } from "@core/antd/Upload";
import Modal from "@core/antd/Modal";

import localeText from "../Text";
import { getBase64 } from "@core/helpers/files/index";

import { IGallery, IGalleryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";

interface IProps extends FormComponentProps {
  item: IGallery | null;
  loading: boolean;
  handleCreateSubmit: (data: IGalleryDTO) => void;
  handleClose: Function;
}

export type IState = {
  addFiles: UploadFile[];
  removeFiles: string[];
  previewVisible: boolean;
  previewImage?: string;
};

const onSubmitHandler = (
  state: IState,
  props: IProps,
  e?: IPressEnterEvent | React.FormEvent
) => {
  e && e.preventDefault();

  const { form, item } = props;

  const galleryId = item ? item.galleryId : 0;
  const name = form.getFieldValue("name");
  const addFiles = state.addFiles
    .filter((value: UploadFile) => value.originFileObj)
    .map((value: UploadFile) => value.originFileObj as File);
  const removeFiles = state.removeFiles;

  props.form.validateFields((err: any, _values: any) => {
    if (!err) {
      props.handleCreateSubmit({
        galleryId: galleryId,
        name: name,
        addFiles: addFiles,
        removeFiles: removeFiles
      });
    }
  });
};

const onClose = (props: IProps, e?: IPressEnterEvent | React.FormEvent) => {
  e && e.preventDefault();

  props.handleClose();
};

export class EditModalContent extends React.Component<IProps, IState> {
  state: IState = {
    addFiles: [],
    removeFiles: [],
    previewVisible: false,
    previewImage: undefined
  };

  onSubmit = (e?: IPressEnterEvent | React.FormEvent) =>
    onSubmitHandler(this.state, this.props, e);

  removeHandler = (file: UploadFile) => {
    if (!file.originFileObj) {
      const { removeFiles } = this.state;
      this.setState({
        removeFiles: [file.name, ...removeFiles]
      });
    }
  };

  successHandler = (info: UploadChangeParam) => {
    if (info.fileList) {
      this.setState({
        addFiles: info.fileList
      });
    }
  };

  cancelHandler = () => this.setState({ previewVisible: false });

  previewHandler = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  render() {
    const { form, item } = this.props;
    const { previewVisible, previewImage } = this.state;

    const { getFieldDecorator } = form;
    const { name, photos } = item || ({} as IGallery);
    const data = {
      listType: "picture-card",
      defaultFileList: photos
        ? photos.map((photo, index) => {
            return {
              uid: "-" + index,
              name: photo.name,
              status: "done",
              url: photo.url
            };
          })
        : []
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <FormItem>
          {getFieldDecorator("name", {
            initialValue: name,
            rules: [{ required: true, message: localeText._rule_require_name }]
          })(
            <Input
              prefix={<Icon type="edit" className="input-prefix-color" />}
              placeholder={localeText._label_name}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("addFiles", {
            rules: [{ required: true, message: localeText._rule_require_photo }]
          })(
            <Upload
              {...data}
              multiple
              onChange={this.successHandler}
              onRemove={this.removeHandler}
              onPreview={this.previewHandler}
            >
              {uploadButton}
            </Upload>
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.cancelHandler}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>

          <Button type="primary" onClick={this.onSubmit}>
            Сохранить
          </Button>
          <Button type="danger" onClick={e => onClose(this.props, e)}>
            Отмена
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create<IProps>()(EditModalContent);
